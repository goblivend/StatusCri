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
        commandFiles.sort((a, b) => a.name < b.name)
        // console.log(commandFiles)
        for (let commandName of commandFiles) {
            command = require(`./${commandName}`)

            embeds.push(new MessageEmbed()
                .setColor('#0099ff')
                .addField('Command : /' + command.name, command.description)
                .setImage(command.image)
            )
        }

        // embed.setFooter('Use `help <command>` to get more information about a command')

        interaction.reply({
            embeds: embeds,
            ephemeral: true, // Only the author will see this message
        })
    }
}