const { Discord, MessageEmbed } = require("discord.js")
const fs = require('fs')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

module.exports = {
    name: "help",
    description: "Shows this help message",
    /**
     *
     * @param {message} interaction The slash command used to call this command
     * @param {json} args The arguments passed to the command
     * @param {boolean} test Whether this is a test or not
     * @param {Instance} instance The instance of the bot
     */
    execute(interaction, args, test, instance) {
        let embeds = []
        // Getting the commands
        commandFiles.sort((a, b) => a.name < b.name)
        // Looping through the commands to get the embeds
        for (let commandName of commandFiles) {
            command = require(`./${commandName}`)
            // Creating the embed from the command
            embeds.push(new MessageEmbed()
                .setColor('#0099ff')
                .addField('Command : /' + command.name, command.description)
                .setImage(command.image)
            )
        }

        // Sending the embeds
        interaction.reply({
            embeds: embeds,
            ephemeral: true, // Only the author will see this message
        })
    }
}