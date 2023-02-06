

export async function login({username, password}){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (username === 'username' && password === "password"){
                resolve()
            }else{
                reject()
            }
        },1000)
    })
}
