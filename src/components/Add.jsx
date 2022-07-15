import React from 'react'

const Add = (props) => {
  
  return (
    <div>
      <div className="header-text">
        <p className='p-text'>Add New Task</p>
      </div>
      <div className='new__tasks'>
        <form onSubmit={props.createTask}>
          <input type="text" onChange={(e) => props.setNewTask(e.target.value)} placeholder='Type here'/>
          <button type='submit' disabled={!props.newTask}>Add Task</button>
        </form>
      </div>
    </div>
  )
}

export default Add