const fetch = require("node-fetch");
const { DEVOUPS_URL, DEVOUPS_SERVICES_CODE_SHORTEN, DEVOUPS_SERVICES_CODE } = require('./DEVOUPS');

module.exports = class Status {

    constructor(service, group, channel) {
        this.service = service;
        this.group = group;
        this.channel = channel;
    }

    get() {
        return fetch(`${DEVOUPS_URL}/${this.group}_${this.service}/statuses`).then(res => {
            return res.json()
        }).then(data => {
            return data.results[data.results.length - 1].success
        }).then(status => {
            this.channel[1].setName(`${status ? "✅" : "❌"}_${DEVOUPS_SERVICES_CODE_SHORTEN[DEVOUPS_SERVICES_CODE.indexOf(this.service)]}`);
            console.log(this.channel[1].name + " Updated");
        }).catch(err => {
            console.log(err);
        })
    }


}

