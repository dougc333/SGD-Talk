const module = {
    namespaced: true,
    state: {
        messages: [],
        selected: [],
        privileges: {},
        project_metadata: {},
    },
    mutations: {
        SET_MESSAGES: function(state, payload) { state.messages = payload },
        SET_PRIVILEGES: function(state, payload) { state.privileges = payload },
        SET_PROJECT_METADATA: function(state, payload) { state.project_metadata = payload },
        SET_SELECTION: function(state, payload) { state.selected = payload },
    },
    actions: {
        setMessages(context, payload) { context.commit('SET_MESSAGES', payload) },
        setPrivileges(context, payload) { context.commit('SET_PRIVILEGES', payload) },
        setProjectMetadata(context, payload) { context.commit('SET_PROJECT_METADATA', payload) },
        setSelection(context, payload) { context.commit('SET_SELECTION', payload) },
    }
}

export default module;