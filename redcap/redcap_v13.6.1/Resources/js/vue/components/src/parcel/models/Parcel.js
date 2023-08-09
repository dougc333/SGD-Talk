export default class Parcel {
    body
    createdAt
    expiration
    from
    id
    lifespan
    read
    subject
    summary
    to

    constructor(data) {
        for (const [key, value] of Object.entries(data)) {
            if(!this.hasOwnProperty(key)) continue
            this[key] = value
        }
    }

    getReadable(date) {
        if(!window.hasOwnProperty('moment')) {
            console.warn('The moment.js library is missing; some features are disabled.')
            return date
        }
        return window.moment(date).fromNow()
    }

    get readableCreatedAt() { return this.getReadable(this.createdAt) }
    get readableExpiration() { return this.getReadable(this.expiration) }
}