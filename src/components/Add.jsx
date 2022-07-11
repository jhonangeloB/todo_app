import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

const Add = (props) => {
  return (
    <div>
      <div className="header-text">
        <p className='p-text'>Add New Task</p>
      </div>
      <div className='new__tasks'>
        <form onSubmit={props.createTask}>
          <input type="text" onChange={(e) => props.setNewTask(e.target.value)} placeholder='Type here'/>
          <button type='submit'><AiOutlinePlus/> &nbsp; Add Task</button>
        </form>
      </div>
    </div>
  )
}

export default Add