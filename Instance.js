// >>>>>>>> Begin imports >>>>>>>>

const { DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_SERVICES_CODE, DEVOUPS_GROUPS } = require('./DEVOUPS')
const { Status } = require('./Status')

// <<<<<<<<< End imports <<<<<<<<<

class Instance {

    constructor(client, setUpdateTime, statusUpdateTime) {
        this.statuses = {}
        this.client = client
        this.setUpdateTime = setUpdateTime
        this.statusUpdateTime = statusUpdateTime
        this.createTimoutStatuses()
        this.createTimoutSet()
    }

    /**
     * Updates the set of services
     */
    async updateSet() {
        let newStatuses = {}
        for (const guild of this.client.guilds.cache.values()) {
            let category = guild.channels.cache.find(chan => chan.type === "GUILD_CATEGORY" && chan.name === "CriStatus")
            if (category) {
                for (const chan of category.children) {
                    let service = DEVOUPS_SERVICES_CODE[DEVOUPS_SERVICES_CODE_SHORTEN.indexOf(chan[1].name.split("_")[1])]
                    let group = this.getGroupFromService(service)
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
     * Returns the status of the service
     */
    async updateStatuses() {
        for (let serv in this.statuses) {
            let [mystatus, service] = await new Status(serv, this.statuses[serv].group).get()
            this.statuses[service].status = mystatus
            let chanName = this.getChannelName(service, mystatus)
            for (const chan of this.statuses[service].channels) {
                let channel = this.client.guilds.cache.get(chan.guild).channels.cache.get(chan.id)
                if (channel) {
                    channel.setName(chanName)
                    console.log(chanName)
                }
            }

        }
        setTimeout(this.updateStatuses, 1000 * 60 * 2);
    }

    /**
     * Removes a service channel from the instance
     * @param {sring} service - service name
     * @param {string} chanId - channel id
     * @param {string} guildId - guild id
     */
    removeService(service, chanId, guildId) {
        console.log(`Removing service ${service}`)

        if (this.statuses[service]) {
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
        // console.log(`Adding service ${service}`)
        if (!this.statuses[service]) {
            let status = (await new Status(service, this.getGroupFromService(service)).get())[0]
            this.statuses[service] = {
                status: status,
                group: this.getGroupFromService(service),
                channels: []
            }
        }
        this.statuses[service].channels.push({ id: chanId, guild: guildId })
        // console.log(`Added service ${service}`)

    }

    /**
     * Gets the group associated with the service in the DEOVUPS database
     * @param {string} service - service name
     * @return {string} group - group name
     */

    getGroupFromService(service) {
        for (let group in DEVOUPS_GROUPS)
            if (DEVOUPS_GROUPS[group].includes(service))
                return group
    }

    /**
     * Returns the name of the channel based on the service and status
     * @param {string} service - service name
     * @param {boolean} status - status of the service
     */
    getChannelName(service, status) {
        return `${status ? "✅" : "❌"}_${DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)]}`
    }


    /**
     * Calls updateStatuses every `this.statusUpdateTime` minutes
     */
    async createTimoutStatuses() {
        await this.updateStatuses()
        setTimeout(this.createTimoutStatuses, this.statusUpdateTime * 1000 * 60);
    }
    /**
     * Calls updateSet every `this.setUpdateTime` minutes
     */
    async createTimoutSet() {
        await this.updateSet()
        setTimeout(this.createTimoutSet, this.setUpdateTime * 1000 * 60);
    }
}

module.exports = { Instance }