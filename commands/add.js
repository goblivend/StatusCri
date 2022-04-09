const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_CODE, DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_SERVICES_CODE, } = require('../DEVOUPS')
const { Permissions } = require('discord.js')
const { Status } = require('../Status')
const { Instance } = require('../Instance')

module.exports = {
    name: "add",
    description: "Adds a service channel in the `CRISTATUS` category to update\nAnd creates it if the category doesn't exist at the moment",
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
            content: "Awaiting response from Devoups...",
            ephemeral: true, // Only the author will see this message
        })
        // Checking if the user has the right permissions
        if (!interaction.member.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin")) {
            interaction.editReply({
                content: `You need the <@&${interaction.guild.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin").id}> role to use this command`,
            })
            return
        }

        // Getting the category in which the channels are stored
        let cat = interaction.guild.channels.cache.find(chan => chan.type === "GUILD_CATEGORY" && chan.name === "CriStatus")
        if (!cat) {
            // Creating the category if it doesn't exist
            category = await interaction.guild.channels.create("CriStatus", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.cache.find(r => r.id === interaction.guild.id),
                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                    }, {
                        id: interaction.guild.roles.cache.find(r => r.id === interaction.guild.id),
                        deny: [Permissions.FLAGS.CONNECT],
                    }, {
                        id: interaction.guild.roles.cache.find(r => r.name === "Status Cri"),
                        allow: [Permissions.FLAGS.MANAGE_CHANNELS],
                    },
                ],
            })
            cat = category

            // Editing the message to inform the user that the category has been created
            interaction.editReply({
                content: 'Category set to ' + category.name,
                ephemeral: true, // Only the author will see this message
            })
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

        // Informing the user that the services are being added
        await interaction.editReply({
            content: "Adding services...",
        })

        // Getting the different promises to add the services
        let promises = []
        // Getting the different channels already present in the category
        let children = Array.from(cat.guild.channels.cache.filter(c => c.parentId === cat.id).values())
        let usedServices = children.map(chan => chan.name.split("_")[1])
        content = "Adding those serivces: " + services.join(", ") + "\n"
        for (let service of services) {
            let shortenService = DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)]
            // If the service is already present, we skip it
            if (usedServices.includes(shortenService)) {
                let chan = children.find(chan => chan.name.split("_")[1] === shortenService)
                if ((content + `<#${chan.id}> already exists\n`).length < 2000)
                    content += `<#${chan.id}> already exists\n`
            } else {
                // If the service is not present, we create it
                promises.push(new Promise(async () => {
                    let channel = await interaction.guild.channels.create("❓_" + DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)], {
                        type: "GUILD_VOICE",
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.cache.find(r => r.id === interaction.guild.id),
                                deny: [Permissions.FLAGS.CONNECT],
                            }, {
                                id: interaction.guild.roles.cache.find(r => r.id === interaction.guild.id),
                                allow: [Permissions.FLAGS.CONNECT],
                            }
                        ]
                    })
                    channel.setParent(cat)
                    await instance.addService(service, channel.id, channel.guild.id)
                    channel.setName(Instance.getChannelName(service, (await new Status(service, Instance.getGroupFromService(service)).get())[0]))
                    if ((content + `Creating channel : <#${channel.id}>\n`).length < 2000)
                        content += `Creating channel : <#${channel.id}>\n`
                }))
            }
        }

        // Waiting for all the promises to be resolved
        // So that we can inform the user that the services have been added
        await Promise.all(promises).then(() => {
            interaction.editReply({
                content: content,
                ephemeral: true, // Only the author will see this message
            })
        })

    }
}
