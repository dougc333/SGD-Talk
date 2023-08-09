<script>
import {libs} from '../../../vue3-factory/src/libs'

const {h} = libs?.vue

export default {
    render() {
        return h('div', {id: 'foo'}, 'hello')
    }
}
</script>

<style scoped>

</style>