export default {
    actions: {        
        get(context) {
            const {api_client} = context
            const params = {route: 'DataMartController:checkDesign'}
            return api_client.get('',{params})
        },
    }
}