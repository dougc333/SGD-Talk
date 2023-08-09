import TestStore from "./TestStore"

let store = null


const storeCallback = ({defineStore}) => {
    const useTestStore = TestStore({defineStore})
    store = {
        test: useTestStore()
    }
    return store
}

export { storeCallback as default, store}