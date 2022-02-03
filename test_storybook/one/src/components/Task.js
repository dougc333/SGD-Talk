import React from 'react'

function Task({task:{id,title,state},onArchiveTask,onPinTask}){
  return(
    <div className="list-item">
     <input type="text" value={title} readOnly={true}/>
    </div>
  )
}





export default Task
