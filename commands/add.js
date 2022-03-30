const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_CODE, DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_SERVICES_CODE, } = require('../DEVOUPS');
const { Permissions } = require('discord.js');

module.exports = {

    name: "add",
    description: "Adds a service channel to update",
    execute(interaction, args, test) {
        interaction.deferReply({
            content: "Awaiting response from Devoups...",
            ephemeral: true, // Only the author will see this message
        }).then(() => {
            if (!interaction.member.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin")) {
                interaction.editReply({
                    content: `You need the <@&${interaction.guild.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin").id}> role to use this command`,
                });
                return;
            }


            let cat = interaction.guild.channels.cache.find(chan => chan.type === "GUILD_CATEGORY" && chan.name === "CriStatus")
            if (!cat) {
                interaction.guild.channels.create("CriStatus", {
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
                }).then(category => {
                    cat = category;
                    interaction.editReply({
                        content: 'Category set to ' + category.name,
                        ephemeral: true, // Only the author will see this message
                    });
                });
                return;
            }
            let services = [];
            for (dev_group in DEVOUPS_GROUPS_CODE) {
                let group = DEVOUPS_GROUPS_CODE[dev_group];
                let val = args.getString(group);
                if (val == null)
                    continue;

                if (val === 'all') {
                    // console.log(group)
                    for (service in DEVOUPS_GROUPS[group]) {
                        // console.log('\t' + DEVOUPS_GROUPS[group][service])
                        services.push(DEVOUPS_GROUPS[group][service]);
                    }
                } else {
                    // console.log(group + '_' + val)
                    services.push(val);
                }
            }
            // console.log(services);
            interaction.editReply({
                content: "Adding services...",
            })
            let promises = [];
            let children = Array.from(cat.guild.channels.cache.filter(c => c.parentId === cat.id).values())
            let usedServices = children.map(chan => chan.name.split("_")[1]);
            content = "Adding those serivces: " + services.join(", ") + "\n";
            for (let service of services) {
                let shortenService = DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)]
                if (usedServices.includes(shortenService)) {
                    let chan = children.find(chan => chan.name.split("_")[1] === shortenService)
                    console.log(`Channel #${service} already exists`);
                    if ((content + `<#${chan.id}> already exists\n`).length < 2000)
                        content += `<#${chan.id}> already exists\n`;
                } else {
                    console.log(`Creating channel : ${service}`);
                    promises.push(interaction.guild.channels.create("❓_" + DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)], {
                        type: "GUILD_VOICE",
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.cache.find(r => r.id === interaction.guild.id),
                                deny: [Permissions.FLAGS.CONNECT],
                            }, {
                                id: interaction.guild.roles.cache.find(r => r.id === interaction.guild.id),
                                allow: [Permissions.FLAGS.CONNECT],
                            },
                        ],
                    }).then(channel => {
                        channel.setParent(cat)
                        if ((content + `Creating channel : <#${channel.id}>\n`).length < 2000)
                            content += `Creating channel : <#${channel.id}>\n`
                    }))


                }
            }

            Promise.all(promises).then(() => {
                interaction.editReply({
                    content: content,
                    ephemeral: true, // Only the author will see this message
                });
            })
            console.log('\n')
        })
    }
}