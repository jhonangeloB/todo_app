import React, { useState } from "react";
import { db } from "../config/firebase";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
const Edit = (props) => {
  const [updatedTask, setUpdatedTask] = useState("");

  const updateTask = async (e) => {
    e.preventDefault();
    const taskDoc = doc(db, "tasks", props.temp.id);
    try {
      await updateDoc(taskDoc, {
        name: updatedTask,
      });
    }
    catch (err) {
      alert(err);
    }
    e.target.reset();
    setUpdatedTask('')
  };

  return (
    <div>
      <div className="header-text">
        <p className='p-text'>Edit Task</p>
      </div>
      <div className='new__tasks'>
        <form onSubmit={updateTask}>
          <input type="text" onChange={(e) => setUpdatedTask(e.target.value)} placeholder={props.temp.name ? (props.temp.name) : 'Choose task to edit' }/>
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Edit