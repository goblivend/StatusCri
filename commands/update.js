const fetch = require("node-fetch");

module.exports = {
    name: "update",
    description: "Updates the statuses",
    execute(interaction, args, test) {
        const DEVOUPS_URL = "https://devoups.online/api/v1/services/";
        getStatus(DEVOUPS_URL, "assistants-services", "git-assistants").then(status => {
            interaction.reply({
                content: `Git Assistants: ${status}`,
                ephemeral: true, // Only the author will see this message
            })
        });


    }
}

function getStatus(url, group, service) {
    return fetch(`${url}/${group}_${service}/statuses`).then(res => {
        return res.json();
    }).then(data => {
        return data.results[0].conditionResults[0].success;
    }).catch(err => {
        console.log(err);
    });

}