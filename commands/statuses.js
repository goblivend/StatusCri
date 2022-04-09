const { MessageActionRow, MessageButton } = require('discord.js')
const { DEVOUPS_GROUPS, DEVOUPS_GROUPS_CODE, DEVOUPS_SERVICES_NAME, DEVOUPS_SERVICES_CODE, DEVOUPS_URL } = require('../DEVOUPS')
const { Status } = require('../Status')


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
        // Creating a deferReply in the meantime to avoid the message to be deleted
        interaction.deferReply({
            content: "Awaiting response from Devoups...",
            ephemeral: true, // Only the author will see this message
        })

        // Getting the services asked by the user
        let services = []
        for (group of DEVOUPS_GROUPS_CODE) {
            let val = args.getString(group)
            if (val == null)
                continue

            if (val === 'all') {
                for (service of DEVOUPS_GROUPS[group]) {
                    services.push([group, service])
                }
            } else {
                services.push([group, val])
            }
        }
        // Getting the promises to inform the status of the services
        let promises = []
        for (tuple of services) {
            let group = tuple[0]
            let service = tuple[1]
            promises.push(
                instance.statuses[service] ?
                    new Promise(async () => { return instance.statuses[service].status }) :
                    new Status(service, group).get()
            )
        }
        // Waiting for the promises to be resolved and then sending the message
        Promise.all(promises).then(values => {
            let mycontent = ""
            let rows = []
            for (i = 0; i < values.length; i++) {
                let [mystatus, service] = values[i]
                if (i < 25) {
                    if (i % 5 == 0) {
                        rows.push(new MessageActionRow())
                    }
                    let button = new MessageButton()
                        .setCustomId(service)
                        .setLabel(DEVOUPS_SERVICES_NAME[DEVOUPS_SERVICES_CODE.indexOf(service)])
                        .setStyle(mystatus ? 'SUCCESS' : 'DANGER')
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
            }
            interaction.editReply({
                content: services.length <= 25 ? "Here are the statuses of the specified services " :
                    `Here are the statuses of the first 25 specified services:\n${mycontent}`,

                components: rows
            })
        })

    }
}
