export default (API) => {
    const client = API.client

    return {
        getTodos: () => {
            return client.get('https://jsonplaceholder.typicode.com/todos/')
        },
        getTodo(id) {
            return client.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        },
    }
}