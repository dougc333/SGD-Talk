// as independent serializer/deserializer
import UsersManager from '../models/UsersManager'
// import User from '../models/User'

const add = (a,b) => a+b

self._manager = null

self.addEventListener('message', event => {
    const { action, params } = event.data;
    console.log(action, params)
    let result = {
        action: '',
        payload: '',
        params: []
    };

    switch (action) {
        case 'init':
            self._manager = new UsersManager(...params);
            result.payload = 'created'
            break;
        case 'add':
            result.payload = add(...params);
            break;
        case 'includeUser':
            self._manager.includeUser(...params);
            self._manager.updateState();
            result.action = 'updateState'
            result.payload = self._manager.getState()
            break;
        case 'excludeUser':
            self._manager.excludeUser(...params);
            self._manager.updateState();
            result.action = 'updateState'
            result.payload = self._manager.getState()
            break;
        default:
            null;
    }
    self.postMessage(result);
});