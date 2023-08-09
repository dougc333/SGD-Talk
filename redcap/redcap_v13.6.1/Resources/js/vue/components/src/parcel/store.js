import {reactive} from 'vue'
import FetchClient from '../../../../modules/FetchClient.js';
import Parcel from './models/Parcel.js'

/**
 * derived class meant to be used in system context (no 'pid' must be submitted in the query params)
 */
/* class SystemFetchClient extends FetchClient {
    #skipParams = ['pid']
    visitGlobalParams(params) {
        const filtered = {}
        for (const [key, value] of Object.entries(params)) {
            if(this.#skipParams.includes(key)) continue
            filtered[key] = value
        }
        return filtered
    }
} */



/**
 * actions for the sendCommand ajax method
 */
const actions = Object.freeze({
    TOGGLE_READ: 'toggle_read',
    DELETE: 'delete',
    DELETE_SELECTED: 'delete_selected',
    MARK_UNREAD_SELECTED: 'mark_unread_selected',
    MARK_READ_SELECTED: 'mark_read_selected',
})


let baseURL = '';
if(window.app_path_webroot_full) {
    baseURL = `${window.app_path_webroot_full}redcap_v${window.redcap_version}/`;
}else {
    baseURL = `${location.protocol}//${location.host}/api`
}
const client = new FetchClient(baseURL);

// store first initialization
let initialized = false

const store = reactive({
    loading: false,
    settings: {},
    list: [], //parcels
    active: null, // active parcel
    selected: [], // list of selected (checked) parcels
    findParcel(id) {
        const found = this.list.find(parcel => parcel.id===id)
        return found
    },
    get unread() {
        let total = 0
        for (const parcel of this.list) {
            if(parcel?.read===false) total++
        }
        return total
    },
    reset() {
        this.active = null
        this.selected = []
        this.list = []
    },
    async fetchList() {
        try {
            this.loading = true
            this.reset()
            const params = {
                route: 'ParcelController:list',
            };
            const response = await client.send('', {params, method: 'GET'});
            const {data=[], metadata={}} = response;
            this.list = data.map(obj => new Parcel(obj))
        } catch (error) {
            console.log('error fetching messages', error)
        } finally {
            this.loading = false
        }
    },
    async fetchSettings() {
        const params = {
            route: 'ParcelController:settings',
        };
        const response = await client.send('', {params, method: 'GET'});
        this.settings = response
        // console.log(this, data, metadata)
    },
    async sendCommand(action, args={}) {
        const params = {
            route: 'ParcelController:command',
        };
        const response = await client.send('', {
            method: 'POST',
            params,
            data: {
                action, args
            }
        });
        return response
    },
    /**
     * send commands, but use optimistic update
     * 
     * @param {String} ID 
     * @returns 
     */
    async deleteParcel(ID) {
        const updateList = (parcel) => {
            const index = this.list.indexOf(parcel)
            if(index>=0) this.list.splice(index, 1)
        }
        const updateSelected = (ID) => {
            const index = this.selected.indexOf(ID)
            if(index<0) return
            this.selected.splice(index, 1)
        }
        const updateActive = (ID) => {
            if(parcel!==this.active) return
            this.active = null
        }
        const parcel = this.findParcel(ID)
        if(!parcel) return
        updateSelected(ID)
        updateActive(parcel)
        updateList(parcel)
        
        return this.sendCommand(actions.DELETE, {id: ID})
    },
    /**
     * send commands, but use optimistic update
     * 
     * @param {String} ID 
     * @param {Boolean} read 
     * @returns 
     */
    async markParcel(ID, read) {
        const parcel = this.findParcel(ID)
        if(parcel) parcel.read = read
        return this.sendCommand(actions.TOGGLE_READ, {id: ID, read})
    },
    /**
     * toggle active parcel
     * @param {Object} parcel 
     */
    toggle(parcel) {
        if(this.active === parcel) this.active = null
        else this.active = parcel
    },
    async init() {
        if(initialized) return
        initialized = true
        const promise = new Promise(async (resolve, reject) => {
            try {
                await this.fetchSettings()
                await this.fetchList()
                resolve()
            } catch (error) {
                reject(error)
            }
        })
        return promise
    }
})



export { store as default }
