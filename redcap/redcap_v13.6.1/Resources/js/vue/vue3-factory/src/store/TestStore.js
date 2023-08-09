

export default ({defineStore}) => {
    const useStore = defineStore('test', {
        state: () => {
            return {
                count: 0,
            }
        },
        actions: {
            increment(val=1) {
                this.count += val
            },
            async waitAndIncrement(val=1) {
                setTimeout(() => {
                    this.increment(val)
                }, 2000)
            }
        },
        getters: {
            doubleCount: (state) => {
                return state.count*2
            }
        }
    })
    return useStore
}