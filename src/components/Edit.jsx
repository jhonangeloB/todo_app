import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

const Edit = (props) => {
  return (
    <div>
      <div className="header-text">
        <p className='p-text'>Edit Task</p>
      </div>
      <div className='new__tasks'>
        <form onSubmit={props.updateHandler}>
          <input type="text" onChange={(e) => props.setNewTask(e.target.value)} placeholder={props}/>
          <button type='submit'><AiOutlineEdit/> &nbsp; Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Edit