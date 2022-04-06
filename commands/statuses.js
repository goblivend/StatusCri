const fetch = require("node-fetch")
const { MessageActionRow, MessageButton } = require('discord.js')
const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_CODE, DEVOUPS_SERVICES_NAME, DEVOUPS_SERVICES_CODE, DEVOUPS_URL } = require('../DEVOUPS')



module.exports = {
    name: "statuses",
    description: "Gets the statuses of the specified services",
    image: "https://raw.githubusercontent.com/goblivend/StatusCri/main/README%20Content/Direct%20statuses%20assistant-services%20picture.png",
    /**
     *
     * @param {message} interaction The slash command used to call this command
     * @param {json} args The arguments passed to the command
     * @param {boolean} test Whether this is a test or not
     * @param {Instance} instance The instance of the bot
     */
    execute(interaction, args, test, instance) {
        interaction.deferReply({
            content: "Awaiting response from Devoups...",
            ephemeral: true, // Only the author will see this message
        })


        let services = []
        for (group of DEVOUPS_GROUPS_CODE) {
            let val = args.getString(group)
            if (val == null)
                continue

            if (val === 'all') {
                // console.log(group)
                for (service of DEVOUPS_GROUPS[group]) {
                    // console.log('\t' + service)
                    services.push([group, service])
                }
            } else {
                // console.log(group + '_' + val)
                services.push([group, val])
            }
        }


        // console.log(services)
        let promises = []
        for (tuple of services) {
            let group = tuple[0]
            let service = tuple[1]
            // getStatus(DEVOUPS_URL, group, service)
            promises.push(new Promise(async () => {
                return instance.statuses[service] ? instance.statuses[service].status : await new Status(group, service).get()
            }))
        }
        Promise.all(promises).then(values => {
            let mycontent = ""
            let rows = []
            for (i = 0; i < values.length; i++) {
                let [mystatus, service] = values[i]

                console.log(service + ': ' + (mystatus ? '✅' : '❌'))
                if (i < 25) {
                    if (i % 5 == 0) {
                        rows.push(new MessageActionRow())
                    }
                    let button = new MessageButton()
                        .setCustomId(service)
                        .setLabel(DEVOUPS_SERVICES_NAME[DEVOUPS_SERVICES_CODE.indexOf(service)])
                        .setStyle(mystatus ? 'SUCCESS' : 'DANGER')
                    // .setDisabled(true)
                    if (!mystatus)
                        button.setEmoji('717700063429656587')
                    rows[rows.length - 1].addComponents(button)
                } else {
                    mycontent += `${mystatus ? '✅' : '❌'} ${DEVOUPS_SERVICES_NAME[DEVOUPS_SERVICES_CODE.indexOf(service)]}\n`
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
                //console.log("\n\nMy additionnal content is :" + mycontent + '\n\n')
            }
            interaction.editReply({
                content: services.length <= 25 ? "Here are the statuses of the specified services " :
                    `Here are the statuses of the first 25 specified services:\n${mycontent}`,

                components: rows
            })
        })

    }
}
