import routes from '@/router/routes'

export default (context, VueRouter) => {
    const {store} = context.VueFactory
    const router = new VueRouter({
        mode: 'hash', // hash|history
        base: process.env.BASE_URL,
        routes
    })

    router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            const user = store.state.user.info
            if(user && user.can_create_revision===true) {
                next()
            }else {   
                next({
                    path: '/',
                    // query: { redirect: to.fullPath }
                })
            }
        }else {
            next() // make sure to always call next()!
        }
    })

    return router
}