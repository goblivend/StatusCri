const Embed = require('../Embeds');


module.exports = {
    name: 'help',
    description: 'Send an helping message',
    execute(message, args, Discord){
        const embed = Embed.MyEmbed(new Discord.MessageEmbed)
            .setColor('#0099ff')
            .setTitle('Help guide')
            //.setURL('')
            .setDescription('An help message ')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/AfFp7pu.png');
        message.channel.send({embeds : [embed]});

    }



}