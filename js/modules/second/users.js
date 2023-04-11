
function usersWrapper(){
    const users = ['ann', 'bob', 'connie']

    const getUsers = () => {
        return users
    }
    APP.getUsers = getUsers

}

usersWrapper()

