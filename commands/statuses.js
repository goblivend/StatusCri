const fetch = require("node-fetch");
const { MessageActionRow, MessageButton } = require('discord.js');
const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_CODE, DEVOUPS_SERVICES_NAME, DEVOUPS_SERVICES_CODE, DEVOUPS_URL } = require('../DEVOUPS');



module.exports = {
    name: "statuses",
    description: "Gets the statuses of the specified services",
    image: "https://raw.githubusercontent.com/goblivend/StatusCri/main/README%20Content/Direct%20statuses%20assistant-services.png",
    execute(interaction, args, test) {
        interaction.deferReply({
            content: "Awaiting response from Devoups...",
            ephemeral: true, // Only the author will see this message
        })


        let services = [];
        for (group of DEVOUPS_GROUPS_CODE) {
            let val = args.getString(group);
            if (val == null)
                continue;

            if (val === 'all') {
                // console.log(group)
                for (service of DEVOUPS_GROUPS[group]) {
                    // console.log('\t' + service)
                    services.push([group, service]);
                }
            } else {
                // console.log(group + '_' + val)
                services.push([group, val]);
            }
        }


        // console.log(services);
        let promises = [];
        for (tuple of services) {
            let group = tuple[0];
            let service = tuple[1];
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
                let [service, status] = values[i];

                console.log(service + ': ' + (status ? '✅' : '❌'));
                if (i < 25) {
                    if (i % 5 == 0) {
                        rows.push(new MessageActionRow())
                    }
                    let button = new MessageButton()
                        .setCustomId(service)
                        .setLabel(DEVOUPS_SERVICES_NAME[DEVOUPS_SERVICES_CODE.indexOf(service)])
                        .setStyle(status ? 'SUCCESS' : 'DANGER')
                    // .setDisabled(true)
                    if (!status)
                        button.setEmoji('717700063429656587')
                    rows[rows.length - 1].addComponents(button);
                } else {
                    mycontent += `${status ? '✅' : '❌'} ${DEVOUPS_SERVICES_NAME[DEVOUPS_SERVICES_CODE.indexOf(service)]}\n`
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
                mycontent += '❌ test\n'
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
