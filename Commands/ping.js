
module.exports = {
    name: "ping",
    description: "Replies with pong",
    execute(interaction, args, Discord, fetch) {
        interaction.reply({
            content: 'pong',
            ephemeral: true, // Only the author will see this message
        });
    }
}