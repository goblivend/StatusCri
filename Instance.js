// >>>>>>>> Begin imports >>>>>>>>

const { DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_SERVICES_CODE, DEVOUPS_GROUPS } = require('./DEVOUPS')
const { Status } = require('./Status')
const { client } = require('./index')
const { log } = require('./generalFunctions')

// <<<<<<<<< End imports <<<<<<<<<

class Instance {

    constructor(setUpdateTime, statusUpdateTime) {
        this.statuses = {}
        this.setUpdateTime = setUpdateTime
        this.statusUpdateTime = statusUpdateTime

        // Update the set of services every setUpdateTime seconds
        this.updateSet()
        setInterval(this.updateSet, this.setUpdateTime * 1000 * 60)

        // Update the status of the services every setUpdateTime seconds
        this.updateStatuses()
        setInterval(this.updateStatuses, this.statusUpdateTime * 1000 * 60)
    }


    /**
     * Updates the statuses of the services
     */
    async updateStatuses() {
        log("Statuses update")

        // Checking for each services saved if the status has changed
        for (let serv in this.statuses) {
            // Getting the new status
            let [mystatus, service] = await new Status(serv, this.statuses[serv].group).get()
            // Updating the status if it has changed
            if (mystatus != this.statuses[serv].status) {
                this.statuses[service].status = mystatus
                // Getting the name of the channel to update
                let chanName = Instance.getChannelName(service, mystatus)
                // Cycling through each server to update the names of the channels
                for (const chan of this.statuses[service].channels) {
                    let channel = client.guilds.cache.get(chan.guild).channels.cache.get(chan.id)
                    if (channel)
                        channel.setName(chanName)
                }
            }
        }
    }

    /**
     * Updates the set of services
     */
    async updateSet() {
        log("Set update")

        let newStatuses = {}
        // Cycling through each server to get the different services to keep track of
        for (const guild of client.guilds.cache.values()) {
            let category = guild.channels.cache.find(chan => chan.type === "GUILD_CATEGORY" && chan.name === "CriStatus")
            // If a category is found, cycling through the channels to get the services
            if (category) {
                for (const chan of category.children) {
                    if (!(chan[1].name.startsWith("❓_") || chan[1].name.startsWith("❌_") || chan[1].name.startsWith("✅_"))) {
                        log(`The channel ${chan[1].name} present in the server ${chan[1].guild.name} is not a service`)
                    }
                    let service = DEVOUPS_SERVICES_CODE[DEVOUPS_SERVICES_CODE_SHORTEN.indexOf(chan[1].name.split("_")[1])]
                    let group = Instance.getGroupFromService(service)
                    if (!newStatuses[service]) {
                        newStatuses[service] = {
                            status: false,
                            group: group,
                            channels: [{ id: chan[1].id, guild: chan[1].guild.id }]
                        }
                    }
                }
            }
        }
        this.statuses = newStatuses
    }

    /**
     * Removes a service channel from the instance
     * @param {sring} service - service name
     * @param {string} chanId - channel id
     * @param {string} guildId - guild id
     */
    removeService(service, chanId, guildId) {
        // Removing the service of the guild if it exists
        if (this.statuses[service]) {
            // Cycling through the channels to remove the channel
            for (let chan of this.statuses[service].channels) {
                if (chan.id === chanId && chan.guild === guildId)
                    this.statuses[service].channels.splice(this.statuses[service].channels.indexOf(chan), 1)
            }
            if (this.statuses[service].channels.length == 0)
                delete this.statuses[service]
        }
    }

    /**
     * Adds a service to the instance
     * @param {string} service - service name
     * @param {string} chanId - channel id
     * @param {string} guildId - guild id
     */
    async addService(service, chanId, guildId) {
        // Checking if the service is already in the instance and if not, adding it and getting the status to initialize it
        if (!this.statuses[service]) {
            let status = (await new Status(service, Instance.getGroupFromService(service)).get())[0]
            this.statuses[service] = {
                status: status,
                group: Instance.getGroupFromService(service),
                channels: []
            }
        }
        this.statuses[service].channels.push({ id: chanId, guild: guildId })

    }

    /**
     * Gets the group associated with the service in the DEOVUPS database
     * @param {string} service - service name
     * @return {string} group - group name
     */
    static getGroupFromService(service) {
        // Getting the group of the service
        for (let group in DEVOUPS_GROUPS)
            if (DEVOUPS_GROUPS[group].includes(service))
                return group
    }

    /**
     * Returns the name of the channel based on the service and status
     * @param {string} service - service name
     * @param {boolean} status - status of the service
     */
    static getChannelName(service, status) {
        return `${status ? "✅" : "❌"}_${DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)]}`
    }
}

module.exports = { Instance }