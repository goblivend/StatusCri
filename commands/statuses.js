const fetch = require("node-fetch");
const { MessageActionRow, MessageButton } = require('discord.js');
const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_NAMES, DEVOUPS_SERVICES_NAMES, DEVOUPS_URL } = require('../DEVOUPS.json');



module.exports = {
    name: "statuses",
    description: "Gets the statuses of the services",
    execute(interaction, args, test) {
        interaction.deferReply({
            content: "Awaiting response from Devoups...",
            ephemeral: true, // Only the author will see this message
        })

        let services = [];
        for (dev_group in DEVOUPS_GROUPS_NAMES) {
            let group = DEVOUPS_GROUPS_NAMES[dev_group];
            let val = args.getString(group);
            if (val == null)
                continue;

            if (val === 'all') {
                // console.log(group)
                for (service in DEVOUPS_GROUPS[group]) {
                    // console.log('\t' + DEVOUPS_GROUPS[group][service])
                    services.push([group, DEVOUPS_GROUPS[group][service]]);
                }
            } else {
                console.log(group + '_' + val)
                services.push([group, val]);
            }
        }


        // console.log(services);
        let promises = [];
        for (i = 0; i < services.length; i++) {
            let serv = services[i];
            let group = serv[0];
            let service = serv[1];
            // getStatus(DEVOUPS_URL, group, service)
            promises.push(fetch(`${DEVOUPS_URL}/${group}_${service}/statuses`).then(res => {
                return res.json();
            }).then(data => {
                return data.results[data.results.length - 1].success;
            }).then(status => {
                return [service, status];
            }).catch(err => {
                console.log(err);
            }))
        }

        Promise.all(promises).then(values => {
            let mycontent = "";
            let rows = []
            for (i = 0; i < values.length; i++) {
                let val = values[i];
                console.log(val[0] + ': ' + (val[1] ? '✅' : '❌'));
                if (i < 25) {
                    if (i % 5 == 0) {
                        rows.push(new MessageActionRow())
                    }
                    let button = new MessageButton()
                        .setCustomId(val[0])
                        .setLabel(DEVOUPS_SERVICES_NAMES[val[0]])
                        .setStyle(val[1] ? 'SUCCESS' : 'DANGER')
                    // .setDisabled(true)
                    if (!val[1])
                        button.setEmoji('717700063429656587')
                    rows[rows.length - 1].addComponents(button);
                } else {
                    mycontent += `${DEVOUPS_SERVICES_NAMES[val[0]]}: ${val[1] ? '✅' : '❌'}\n`
                }
            }
            if (test) {
                if (values.length < 25) {
                    if (values.length % 5 == 0) {
                        rows.push(new MessageActionRow())
                    }
                    rows[rows.length - 1].addComponents(new MessageButton()
                        .setCustomId('test')
                        .setLabel('test')
                        .setStyle('DANGER')
                        .setDisabled(true)
                        .setEmoji('717700063429656587')
                    )
                }
                mycontent += 'test :x:\n'
                //console.log("\n\nMy additionnal content is :" + mycontent + '\n\n');
            }
            interaction.editReply({
                content: services.length <= 25 ? "Here are the statuses of the specified services " :
                    `Here are the statuses of the first 25 specified services:\n${mycontent}`,

                components: rows
            });
        })
    }
}

async function getStatus(url, group, service) {
    val = await fetch(`${url}/${group}_${service}/statuses`).then(res => {
        return res.json();
    }).then(data => {
        return data.results[0].conditionResults[0].success;
    }).catch(err => {
        console.log(err);
    });
    return val;

}