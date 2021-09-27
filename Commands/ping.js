module.exports = {
    name: 'ping',
    description: 'respond to ping by pong',
    execute(message, args, Discord){
        message.reply("pong !");
    }
}