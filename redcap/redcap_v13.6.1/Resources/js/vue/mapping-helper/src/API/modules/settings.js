import {route} from '@/variables'

export default {
    actions: {        
        get(context, identifier) {
            const {api_client} = context
            var params = {
                route: `${route}:getSettings`,
                record_identifier: identifier,
            }
            return api_client.get('',{params})
        },
    }
}