import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'
import { db } from './config/firebase';
import { doc, onSnapshot, setDoc, collection, deleteDoc, addDoc } from "firebase/firestore";
import './App.scss';

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const tasksCollectionRef = collection(db, 'tasks')

  const createTask = async (e) => {
    e.preventDefault();
    e.target.reset();
    await addDoc(tasksCollectionRef, {
      name: newTask
    })
  }

  const deleteTask = async (id) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
  }

  useEffect(() => {
    onSnapshot(tasksCollectionRef, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    })
  }, [])
  
  return (
    <div className="App">
      <div className="app__container">
        <div className="app__container-header">
          <div className='circle'></div>
          <div className='circle'></div>
          <div className='circle'></div>
        </div>
        <div className="app__container-contents">
          <div className="app__container-main">
            <div className="header-text">
              <h4>My Tasks</h4>
              <p className='p-text'>
                 Tick checkbox for more options          
                </p>
            </div>
            <div className="scrollable-div">
            {tasks && tasks.map((task) => (
              <div className='app__tasks'>
                <div className='taskname'>
                  <h6 >{task.name}</h6>
                </div>
                <div className='deleteicon'>
              <>
                  <AiOutlineEdit onClick={() => {deleteTask(task.id)}}/>
                  <AiOutlineDelete onClick={() => {deleteTask(task.id)}}/></>

                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="app__container-side">
            <div className="header-text">
              <p className='p-text'>Edit Task</p>
            </div>
            <div className='new__tasks'>
              <form onSubmit={createTask}>
                <input type="text" onChange={(e) => setNewTask(e.target.value)} />
                <button type='submit'><AiOutlineEdit/> &nbsp; Submit</button>
              </form>
              </div>
              <div className="header-text">
              <p className='p-text'>Add New Task</p>
            </div>
              <div className='new__tasks'>
              <form onSubmit={createTask}>
                <input type="text" onChange={(e) => setNewTask(e.target.value)} placeholder='Type here'/>
                <button type='submit'><AiOutlinePlus/> &nbsp; Add Task</button>
              </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
