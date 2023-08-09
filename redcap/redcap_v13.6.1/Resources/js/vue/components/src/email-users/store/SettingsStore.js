export default {
    lang: {},
    user: {
        username: null,
        emails: [],
    },
    settings: [],
    loadData(data) {
        this.lang = data.lang
        this.user = data.user
        this.settings = data.settings || []
    },
}