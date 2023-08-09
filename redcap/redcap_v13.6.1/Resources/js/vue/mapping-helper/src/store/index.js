import app_settings from '@/store/modules/app_settings'
import user from '@/store/modules/user'
import project from '@/store/modules/project'

export default (context, Vuex) => {
    var initialState = {}

    const store = new Vuex.Store({
        state: {...initialState},
        modules: {
            app_settings,
            user,
            project,
        },
        mutations: {},
        actions: {},
        getters: {},
    })

    return store
 }