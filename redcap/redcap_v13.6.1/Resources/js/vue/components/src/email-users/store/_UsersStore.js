import AsyncWorker from '../../../../../modules/WebWorker/WebWorker'

import { arrayDiff, arrayUnion } from '../utils'
import {getGroupUiIds, mapUserId} from './UsersEffects'




class MyStore {

        loading = false
        metadata = {}
        users = [] // original source
        query = ''
        // selectedUsers = []
        showSuspended = false
        showSelectedOnly = false
        _excludedUsers = [] // keep track of manually excluded users
        _includedUsers = [] // keep track of manually included users
        _groups = {}
        _nonSuspendedUsers = []

        loadData(data) {
            this.users = data.data
            this.metadata = data.metadata
            this.onLoad()
        }

        onLoad() {
            this._nonSuspendedUsers = this.users.filter( user => user.user_suspended_time==null )
        }

        get nonSuspendedUsers() { return this._nonSuspendedUsers }
    
        get total() { return this.users.length }
        get totalSelected() { return this.selectedUsers.length }
        get totalFilteredUsers() { return this.filteredUsers.length }
        get totalFilteredAndSelectedUsers() {
            return this.filteredUsers.filter( user => this.selectedUsers.includes(user.ui_id)).length
        }
        get totalNonSuspended() { return this.nonSuspendedUsers.length }
        get totalSource() { return this.source.length }
    
        get selectedUsers() {
            let ui_ids = [...this.groupsSelectedUsers]
            ui_ids = arrayUnion(ui_ids, [...this._includedUsers])
            ui_ids = arrayDiff(ui_ids, [...this._excludedUsers])
            return ui_ids
        }
        get groupsSelectedUsers() {
            let ui_ids = []
            for (let values of Object.values(this._groups)) {
                ui_ids = arrayUnion(ui_ids, values)
            }
            return ui_ids
        }
        get selectableUiIds() { return mapUserId(this.nonSuspendedUsers) }
        get filteredUsers() {
            const regexp = new RegExp(this.query, 'i')
            
            const users = this.source.filter(user => {
                const searchable = [user.username, user.user_email, user.user_firstname, user.user_lastname]
                const text = searchable.join(' ')
                if(text.match(regexp)) return true
                return false
                // return matches['words'].length>0
            })
            return users
        }
        get source() { 
            let source = this.showSuspended ? this.users : this.nonSuspendedUsers
            // if(this.showSelectedOnly===true) source = source.filter( user => this.selectedUsers.includes(user.ui_id) )
            return source
        }
    
    
        stateToString() {
            return JSON.stringify({
                loading: this.loading,
                metadata: this.metadata,
                users: this.users,
                // selectedUsers: this.//,
                showSuspended: this.showSuspended,
                showSelectedOnly: this.showSelectedOnly,
                excludedUsers: this._excludedUsers,
                includedUsers: this._includedUsers,
                query: this.query,
                groups: this._groups,
                nonSuspendedUsers: this.nonSuspendedUsers,
                selectedUsers: this.selectedUsers,
                groupsSelectedUsers: this.groupsSelectedUsers,
                selectableUiIds: this.selectableUiIds,
                filteredUsers: this.filteredUsers,
                source: this.source,
            })
        }
    
        toggleSelectAll() {
            const allSelected = this.selectableUiIds.length == this.selectedUsers.length
            this._groups = {}
            this._excludedUsers = []
            if(allSelected) this._includedUsers = []
            else this._includedUsers = mapUserId(this.nonSuspendedUsers)
        }
        toggleSelectFiltered() {
            const selectedFiltered = this.filteredUsers.filter( user => this.selectedUsers.includes(user.ui_id) )
            const allSelected = this.filteredUsers.length === selectedFiltered.length
            const filteredUiIds = mapUserId(this.filteredUsers)
            if(allSelected) {
                for (const ui_id of filteredUiIds) {
                    const index = this._includedUsers.indexOf(ui_id)
                    if(index>=0) this._includedUsers.splice(index, 1)
                }
            }else {
                for (const ui_id of filteredUiIds) {
                    if(!this._includedUsers.includes(ui_id)) this._includedUsers.push(ui_id)
                }
            }
        }
        toggleCustomSelectedUser(user) {
            if(user.user_suspended_time) return
            let {ui_id} = user
            if(!ui_id) return
            const overallSelectionIndex = [...this.selectedUsers].indexOf(ui_id)
            const groupsSelectionIndex = [...this.groupsSelectedUsers].indexOf(ui_id)
            const excludedUsersIndex = [...this._excludedUsers].indexOf(ui_id)
            const includedUsersIndex = [...this._includedUsers].indexOf(ui_id)
            const include = overallSelectionIndex<0 // include if not part of the selection derived from the groups
            if(include) {
                if(excludedUsersIndex>=0) this._excludedUsers.splice(excludedUsersIndex, 1)
                // no need to manually include if already part of the group selection
                if(groupsSelectionIndex>=0) return
                if(includedUsersIndex<0) this._includedUsers.push(ui_id)
            }else {
                if(includedUsersIndex>=0) this._includedUsers.splice(includedUsersIndex, 1)
                // no need to manually exclude if not part of the group selection
                if(groupsSelectionIndex<0) return
                if(excludedUsersIndex<0) this._excludedUsers.push(ui_id)
            }
        }
        // toggle groups of selected users
        toggleGroup(name) {
            const index = Object.keys(this._groups).indexOf(name)
            let ui_ids = getGroupUiIds(this.users, name)
            if(index<0) {
                // remove manually excluded users that match the group
                const exclusionDifference = arrayDiff([...this._excludedUsers], ui_ids)
                this._excludedUsers = exclusionDifference
                // remove manually included users that match the group
                const inclusionDifference = arrayDiff([...this._includedUsers], ui_ids)
                this._includedUsers = inclusionDifference
                this._groups[name] = ui_ids
            }else {
                delete this._groups[name]
            }
        }
        isGroupActive(group) { return Object.keys(this._groups).indexOf(group)>=0 }
        // activity groups are exclusive, so we use a separate function
        toggleActivityGroup(name) {
            const index = Object.keys(this._groups).indexOf(name)
    
            for (const group of Object.keys(this._groups)) {
                if(group==name) continue
                if(! group.match(/^Past\d+(Months|Days)/i)) continue
    
                // remove other activity based groups when applying a new one
                if(index<0) {
                    delete this._groups[group]
                }
            }
            this.toggleGroup(name)
        }
        getPaginatedUsers(page, perPage) {
            const start = (page-1) * perPage
            const end = start + perPage
            const paginated = this.filteredUsers.slice(start, end)
            return paginated
        }

}



/* const _store = useStore(store)
console.log(_store) */

export default new MyStore()