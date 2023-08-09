
<script>
import App from '@/App'
console.log(App)
/* const {BModal} = App.$BootstrapVue

export default {
    extends: BModal,
    created() {
        this.setAsyncShow()
        this.setAsyncHide()
    },
    methods: {
        setAsyncShow() {
            let _show = this.show
            this.show = () => {
                let promise = new Promise((resolve) => {
                    this.$once('shown', () => { resolve({event:'shown',modal: this}) })
                    _show()
                })
                return promise
            }
        },
        setAsyncHide() {
           let _hide = this.hide
            this.hide = () => {
                let promise = new Promise((resolve) => {
                    this.$once('hidden', () => { resolve({event:'hidden',modal: this}) })
                    _hide()
                })
                return promise
            }
        }

    }
} */
</script>

<style>

</style>