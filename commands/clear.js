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
        await interaction.deferReply({
            content: "Awaiting response from Discord...",
            ephemeral: true, // Only the author will see this message
        })
        if (!interaction.member.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin")) {
            interaction.editReply({
                content: `You need the <@&${interaction.guild.roles.cache.find(role => role.name === "Modo" || role.name === "Devoups Admin").id}> role to use this command`,
            })
            return
        }
        let channels = interaction.guild.channels.cache.filter((chan) => chan.parent && chan.parent.name === "CriStatus")
        for (channel of channels) {
            if (channel[1].name.startsWith("❓_") ||
                channel[1].name.startsWith("❌_") ||
                channel[1].name.startsWith("✅_")) {
                instance.removeService(DEVOUPS_SERVICES_CODE[DEVOUPS_SERVICES_CODE_SHORTEN.indexOf(channel[1].name.split("_")[1])])
                channel[1].delete()
            } else
                console.log(channel[1].parent + " " + channel[1].name)
        }
        interaction.editReply({
            content: "Services cleared",
        })
        console.log('\n')

    }
}
