const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_CODE, DEVOUPS_SERVICES_NAME, DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_SERVICES_CODE, DEVOUPS_URL } = require('../DEVOUPS');

module.exports = {

    name: "remove",
    description: "Removes service channels to update",
    execute(interaction, args, test) {
        interaction.deferReply({
            ephemeral: true, // Only the author will see this message
        }).then(() => {
            if (!interaction.member.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin")) {
                interaction.editReply({
                    content: `You need the <@&${interaction.guild.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin").id}> role to use this command`,
                });
            }

            let cat = interaction.guild.channels.cache.find(chan => chan.type === "GUILD_CATEGORY" && chan.name === "CriStatus")
            if (!cat) return;

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
                content: "Removing services...",
            })
            let promises = [];
            let children = Array.from(cat.guild.channels.cache.filter(c => c.parentId === cat.id).values())
            let usedServices = children.map(chan => chan.name.split("_")[1]);
            content = "Removing those serivces: " + services.join(", ") + "\n";
            for (let service of services) {
                let shortenService = DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(service)]
                if (usedServices.includes(shortenService)) {
                    let chan = children.find(chan => chan.name.split("_")[1] === shortenService)
                    console.log(`Removing #${service} channel`);
                    chan.delete()
                    if ((content + `#${service} removed\n`).length < 2000)
                        content += `#${service} removed\n`;
                } else {
                    console.log(`#${service} not found`);
                    if ((content + `#${service} not found\n`).length < 2000)
                        content += `#${service} not found\n`;
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

// https://discord.com/api/oauth2/authorize?client_id=957708011164532766&permissions=268437520&scope=bot%20applications.commands