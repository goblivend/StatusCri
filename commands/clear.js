const { DEVOUPS_SERVICES_CODE, DEVOUPS_SERVICES_CODE_SHORTEN } = require("../DEVOUPS")

module.exports = {
    name: "clear",
    description: "Clears the list of services in the CriStatus category",
    image: "https://raw.githubusercontent.com/goblivend/StatusCri/main/README%20Content/clear.png",
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
            content: "Awaiting response from Discord...",
            ephemeral: true, // Only the author will see this message
        })
        // Checking if the user has the right permissions
        if (!interaction.member.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin")) {
            interaction.editReply({
                content: `You need the <@&${interaction.guild.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin").id}> role to use this command`,
            })
            return
        }
        // Getting all the channels that are in the category
        let channels = interaction.guild.channels.cache.filter((chan) => chan.parent && chan.parent.name === "CriStatus")
        let content = ""
        for (channel of channels) {
            // Just to be safe, checking if the channel is a service channel
            if (channel[1].name.startsWith("❓_") ||
                channel[1].name.startsWith("❌_") ||
                channel[1].name.startsWith("✅_")) {
                instance.removeService(DEVOUPS_SERVICES_CODE[DEVOUPS_SERVICES_CODE_SHORTEN.indexOf(channel[1].name.split("_")[1])], channel[1].id, channel[1].guild.id)
                channel[1].delete()
            } else {
                // Otherwise informing through the logs that the channel is not a service channel
                print(channel[1].parent + " " + channel[1].name)
                content += `${channel[1].parent} ${channel[1].name} is not a service channel, send a message to @goblivend#0133 if you didn't create this channel yourself\n`
            }
        }
        interaction.editReply({
            content: "Services cleared" + '\n' + content,
        })

    }
}
