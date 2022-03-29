
module.exports = {
    name: "ping",
    description: "Replies with pong",
    execute(interaction, args, test) {
        interaction.reply({
            content: 'pong',
            ephemeral: true, // Only the author will see this message
        });
    }
}