const { Discord, MessageEmbed } = require("discord.js");
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
    name: "help",
    description: "Replies with help",
    execute(interaction, args, test) {
        let embed = new MessageEmbed();
        embed.setColor('#0099ff');


        commandFiles.sort((a, b) => a.name < b.name);

        let command_list = [];
        console.log(commandFiles)
        for (let commandName of commandFiles) {
            command = require(`./${commandName}`);
            command_list.push(`\`${command.name}\` - ${command.description}`);
        }
        embed.addField('Commands', command_list.join('\n'));
        // embed.setFooter('Use `help <command>` to get more information about a command');

        interaction.reply({
            embeds: [embed],
            ephemeral: true, // Only the author will see this message
        });
    }
}