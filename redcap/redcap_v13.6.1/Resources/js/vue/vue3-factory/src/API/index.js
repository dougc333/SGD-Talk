import todos from "./todos"
export default ( API ) => {

    const todosAPI = todos(API)
    return {
        todos: todosAPI,
    }
}
