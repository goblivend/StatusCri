const { DEVOUPS_SERVICES_CODE, DEVOUPS_GROUPS, DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_URL } = require("./DEVOUPS");
const fetch = require("node-fetch");
const { Status } = require("./Status");

module.exports = {
    name: "update",
    description: "Updates the list of services in the CriStatus category",
    execute(guild) {

        function myUpdates() {
            console.log("Updating...");
            let promises = []
            let category = guild.channels.cache.find(chan => chan.type === "GUILD_CATEGORY" && chan.name === "CriStatus")
            if (category) {
                let channels = category.children;
                for (channel of channels) {
                    let service = DEVOUPS_SERVICES_CODE[DEVOUPS_SERVICES_CODE_SHORTEN.indexOf(channel[1].name.split("_")[1])];
                    let group = ""
                    for (dev_group in DEVOUPS_GROUPS) {
                        if (DEVOUPS_GROUPS[dev_group].includes(service)) {
                            group = dev_group;
                            break;
                        }
                    }
                    // console.log(service, group)
                    promises.push(new Status(service, group, channel).get());
                }
            }
            Promise.all(promises).then(() => {

                console.log("All promises resolved");
                console.log("\n");
                setTimeout(myUpdates, 1000 * 300);
            })
        }
        myUpdates()

    }

}


