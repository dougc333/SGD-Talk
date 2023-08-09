import {filterPastXMonths, filterPastXDays, filterByDate} from './UsersFilters'

const mapUserId = (users) => { return users.map(user => user.ui_id) }


class GroupsManager {
    users = []

    constructor(users) {
        this.users = users
    }

    get nonSuspendedUsers() { return this.users.filter( user => user.user_suspended_time==null ) }

    // filtered results: all of them based on the nonSuspendedUsers
    get ActiveUsers() { return this.nonSuspendedUsers.filter( user => user.user_lastactivity!=null ) }
    get NonActiveUsers() { return this.nonSuspendedUsers.filter( user => user.user_lastactivity==null ) }
    get LoggedInUsers() { return this.nonSuspendedUsers.filter( user => user.online==1 ) }
    get TableBasedUsers() { return this.nonSuspendedUsers.filter( user => user.table_based_user==1 ) }
    get LDAPUsers() { return this.nonSuspendedUsers.filter( user => user.table_based_user==0 ) }
    
    get ApiTokenUsers() { return this.nonSuspendedUsers.filter( user => user.has_api_token==1 ) }
    get MobileAppUsers() { return this.nonSuspendedUsers.filter( user => user.has_mobile_app_rights==1 ) }
    get ProjectOwners() { return this.nonSuspendedUsers.filter( user => user.is_project_owner==1 ) }
    get CdisUsers() { return this.nonSuspendedUsers.filter( user => user.cdis_user==1 ) }
    
    get Past7DaysUsers() { return filterPastXDays(this.nonSuspendedUsers, 7) }
    get Past1MonthsUsers() { return filterPastXMonths(this.nonSuspendedUsers, 1) }
    get Past3MonthsUsers() { return filterPastXMonths(this.nonSuspendedUsers, 3) }
    get Past6MonthsUsers() { return filterPastXMonths(this.nonSuspendedUsers, 6) }
    get Past12MonthsUsers() { return filterPastXMonths(this.nonSuspendedUsers, 12)  }
}

const getGroupUiIds = (users, name) => {
    let ui_ids = []
    const manager = new GroupsManager(users)
    switch (name) {
        case 'ActiveUsers':
            ui_ids = mapUserId(manager.ActiveUsers)
            break
        case 'NonActiveUsers':
            ui_ids = mapUserId(manager.NonActiveUsers)
            break
        case 'LoggedInUsers':
            ui_ids = mapUserId(manager.LoggedInUsers)
            break
        case 'TableBasedUsers':
            ui_ids = mapUserId(manager.TableBasedUsers)
            break
        case 'LDAPUsers':
            ui_ids = mapUserId(manager.LDAPUsers)
            break
        case 'ApiTokenUsers':
            ui_ids = mapUserId(manager.ApiTokenUsers)
            break
        case 'MobileAppUsers':
            ui_ids = mapUserId(manager.MobileAppUsers)
            break
        case 'ProjectOwners':
            ui_ids = mapUserId(manager.ProjectOwners)
            break
        case 'CdisUsers':
            ui_ids = mapUserId(manager.CdisUsers)
            break
        case 'Past7DaysUsers':
            ui_ids = mapUserId(manager.Past7DaysUsers)
            break
        case 'Past1MonthsUsers':
            ui_ids = mapUserId(manager.Past1MonthsUsers)
            break
        case 'Past3MonthsUsers':
            ui_ids = mapUserId(manager.Past3MonthsUsers)
            break
        case 'Past6MonthsUsers':
            ui_ids = mapUserId(manager.Past6MonthsUsers)
            break
        case 'Past12MonthsUsers':
            ui_ids = mapUserId(manager.Past12MonthsUsers)
            break
        default:
            break
    }
    return ui_ids
}

export {getGroupUiIds, mapUserId}