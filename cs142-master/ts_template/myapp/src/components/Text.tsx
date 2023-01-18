import React, { useState } from "react"

interface Props{
    text:string
}


const Text:React.FC<Props> = ()=>{
    const [count, setCount] = useState<number|null>(5)
    
    return (
        <div>
            TextInputBox here:
            <input />
        </div>
    )
}

export default Text