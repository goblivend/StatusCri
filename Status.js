const fetch = require("node-fetch")
const { DEVOUPS_URL } = require('./DEVOUPS')

class Status {
    constructor(service, group) {
        this.service = service
        this.group = group
    }

    /**
     * Fetch the status of the service in the DEVOUPS API
     * @returns {[boolean, string]} [status, service] - status of the service and the service name
     */
    async get() {
        let result = await fetch(`${DEVOUPS_URL}/${this.group}_${this.service}/statuses`)
        let data = await result.json()
        let status = data.results[data.results.length - 1].success
        return [status, this.service]
    }
}

module.exports = { Status }
