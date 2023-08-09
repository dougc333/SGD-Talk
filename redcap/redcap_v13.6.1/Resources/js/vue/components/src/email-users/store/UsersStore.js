import {reactive} from 'vue'
import UsersManager from '../models/UsersManager'


const store = {
    loading: false,
    groups: [],
    users: [],
    selectedUsers: [], // IDs of selected users
    metadata: {},
    query: '',
    get filterDisabled() { return this.query=='' && this.groups.length==0 },
    sync({data, metadata}) {
        this.metadata = {...metadata}
        this.groups = [...data.groups]
        this.users = [...data.users]
        this.selectedUsers = [...data.selectedIDs]
        this.query = metadata.query ?? ''
    },
    loadData(data) {
        const {data:users} = data
        init(users)
    },
    setQuery(query) {

    },
    async doAction(action, params=[], sync=true) {
        if(this.loading && sync) {
            console.log(`cannot run ${action} because another process is running`)
            return
        }
        try {
            this.loading = true
            const state = await commandManager(action, params)
            const {data, metadata} = state
            if(sync) this.sync({data, metadata})
        } catch (error) {
            console.log(error)
        } finally {
            this.loading = false
        }
    }
}

let usersManager = new UsersManager()
export const init = (users) => {
    usersManager.setUsers(users)
    usersManager.updateState()
    store.sync(usersManager.state)
}

const commandManager = (action, params=[]) => {
    return new Promise((resolve, reject) => {
        if(!usersManager) {
            let message = `UsersManager service not available`
            console.log(message)
            return reject(message)
        }
        switch (action) {
            case 'includeUser':
                usersManager.includeUser(...params)
                break;
            case 'excludeUser':
                usersManager.excludeUser(...params)
                break;
            case 'toggleGroup':
                usersManager.toggleGroup(...params)
                break;
            case 'selectGroups':
                usersManager.selectGroups(...params)
                break;
            case 'deselectGroups':
                usersManager.deselectGroups(...params)
                break;
            case 'toggleSuspended':
                usersManager.toggleSuspended(...params)
                break;
            case 'selectAll':
                usersManager.selectAll(...params)
                break;
            case 'selectFiltered':
                usersManager.selectFiltered(...params)
                break;
            case 'setPage':
                usersManager.setPage(...params)
                break;
            case 'setPerPage':
                usersManager.setPerPage(...params)
                break;
            case 'setQuery':
                usersManager.setPage(1)
                usersManager.setQuery(...params)
                break;
            default:
                let message = `method ${action} not available`
                return reject(message)
                break;
        }
        
        
        usersManager.updateState()
        let state = usersManager.state
        setTimeout(() => {
            resolve(state)
        }, 0);
    })
}



export default store