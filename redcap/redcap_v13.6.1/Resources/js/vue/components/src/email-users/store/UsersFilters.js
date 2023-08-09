// filter users based on activity in the last X months
const filterPastXMonths = (users=[], months=1) => {
    var date = new Date()
    date.setMonth(date.getMonth() - months) // Set it to one month ago
    date.setHours(0, 0, 0, 0) // Zero the time component
    return filterByDate(users, date)
}

const filterPastXDays = (users=[], days=7) => {
    var date = new Date()
    date.setDate(date.getDate() - days) // Set it to one month ago
    date.setHours(0, 0, 0, 0) // Zero the time component
    return filterByDate(users, date)
}

const filterByDate = (users=[], date) => {
    return users.filter( user => {
        if(user.user_lastactivity==null) return false
        const userLastActivity = new Date(user.user_lastactivity)
        return userLastActivity>=date
    })
}

export {filterPastXMonths, filterPastXDays, filterByDate}