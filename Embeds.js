module.exports = {
    MyEmbed : function(Embed) {
        let Picture = 'https://cdn.discordapp.com/avatars/234242303273861130/677409428206ef9aada9517e0a70b1be.png?size=32';
        Embed
            .setAuthor('Ivan (goblivend)', Picture, 'https://github.com/goblivend/StatusCri')
            .setTimestamp()
            .setFooter('Some footer text here', Picture);
        return Embed;
    }
}