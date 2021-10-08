const fetch = require("cross-fetch");


module.exports = {
    name: 'add',
    description: 'Add another chan in the category to check if on or not',
    execute(message, args, Discord){
        //const Embed = Discord.MessageEmbed

        
        fetch(GetUrl(args[0], args[1])).then(response => response.json().then(data => console.log(data))).catch(err => console.log(`Erreur : ${err}`));



    }
}


function GetUrl(group, service) {
    return `https://devoups.online/api/v1/services/${group}_${service}/statuses`;
}