const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_CODE, DEVOUPS_SERVICES_NAME, DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_SERVICES_CODE, DEVOUPS_URL } = require('../DEVOUPS')

module.exports = {

    name: "remove",
    description: "Removes a service channel in the `CRISTATUS` category",
    image: "https://raw.githubusercontent.com/goblivend/StatusCri/main/README%20Content/Main%20feature.png",

    /**
     *
     * @param {message} interaction The slash command used to call this command
     * @param {json} args The arguments passed to the command
     * @param {boolean} test Whether this is a test or not
     * @param {Instance} instance The instance of the bot
     */
    async execute(interaction, args, test, instance) {
        // Creating a deferReply in the meantime to avoid the message to be deleted
        await interaction.deferReply({
            ephemeral: true, // Only the author will see this message
        })
        // Checking if the user has the right permissions
        if (!interaction.member.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin")) {
            interaction.editReply({
                content: `You need the <@&${interaction.guild.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin").id}> role to use this command`,
            })
        }
        // Checking if the category exists
        let cat = interaction.guild.channels.cache.find(chan => chan.type === "GUILD_CATEGORY" && chan.name === "CriStatus")
        if (!cat) {
            interaction.editReply({
                content: 'Category not found, you don\'t have any services to remove',
            })
            return
        }

        // Getting the services asked by the user
        let services = []
        for (dev_group in DEVOUPS_GROUPS_CODE) {
            let group = DEVOUPS_GROUPS_CODE[dev_group]
            let val = args.getString(group)
            if (val == null)
                continue

            if (val === 'all') {
                for (service in DEVOUPS_GROUPS[group]) {
                    services.push(DEVOUPS_GROUPS[group][service])
                }
            } else {
                services.push(val)
            }
        }
        // Informing the user that the services are being removed
        interaction.editReply({
            content: "Removing services...",
        })
        // Getting the promises to remove the channels
        let promises = []
        let children = Array.from(cat.guild.channels.cache.filter(c => c.parentId === cat.id).values())
        children = children.filter(c => (c.name.startsWith("❓_") || c.name.startsWith("❌_") || c.name.startsWith("✅_")))
        let usedServices = children.map(chan => chan.name.split("_")[1])
        content = "Removing those serivces: " + services.join(", ") + "\n"
        for (let service of services) {
            let shortenService = DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)]
            if (usedServices.includes(shortenService)) {
                let chan = children.find(chan => chan.name.split("_")[1] === shortenService)
                instance.removeService(service, chan.id, chan.guild.id)
                chan.delete()
                if ((content + `#${service} removed\n`).length < 2000)
                    content += `#${service} removed\n`
            } else {
                if ((content + `#${service} not found\n`).length < 2000)
                    content += `#${service} not found\n`
            }
        }
        // Waiting for all the promises to be resolved to inform the user that the channels have been removed
        await Promise.all(promises)
        interaction.editReply({
            content: content,
            ephemeral: true, // Only the author will see this message
        })

    }
}
