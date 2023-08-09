import settings from '@/store/modules/settings'


/**
 * state management
 */
 export default (context, Vuex) => {
    var initialState = {}

    const store = new Vuex.Store({
        state: {...initialState},
        modules: {
            settings,
        },
        mutations: {},
        actions: {},
        getters: {},
    })
    return store
}