export default {
    actions: {        

        check(context) {
            const {api_client} = context
            const params = {route: 'DataMartController:checkDesign'}
            return api_client.get('',{params})
        },
        execute(context, command) {
            const {api_client} = context
            const params = {route: 'DataMartController:executeFixCommand'}
            const data = {command}
            return api_client.post('', data, {params})
        },
        fix(context) {
            const {api_client} = context
            const params = {route: 'DataMartController:fixDesign'}
            const data = {}
            return api_client.post('', data, {params})
        },
        notify(context) {
            const {api_client} = context
            const params = {route: 'DataMartController:notifyFix'}
            const data = {}
            return api_client.post('', data, {params})
        }
    }
}