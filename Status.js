const fetch = require("node-fetch")
const { DEVOUPS_URL } = require('./DEVOUPS')

class Status {
    constructor(service, group) {
        this.service = service
        this.group = group
    }

    async get() {
        console.log(`Getting status for ${this.service}`)
        let result = await fetch(`${DEVOUPS_URL}/${this.group}_${this.service}/statuses`)
        let data = await result.json()
        let status = data.results[data.results.length - 1].success
        return [status, this.service]
    }
}

module.exports = { Status }
