import { reactive } from 'vue'
import UsersStore from "./UsersStore"
import SettingsStore from "./SettingsStore"
import FormStore from "./FormStore"

const store = reactive({
    users: UsersStore,
    settings: SettingsStore,
    form: FormStore,
})

export { store as default}