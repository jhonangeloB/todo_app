import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { db } from "./config/firebase";
import {
  doc,
  onSnapshot,
  collection,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import Edit from "./components/Edit";
import "./App.scss";
import Add from "./components/Add";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [tempData, setTempData] = useState({});
  const tasksCollectionRef = collection(db, "tasks");

  const createTask = async (e) => {
    e.preventDefault();
    await addDoc(tasksCollectionRef, {
      name: newTask,
    });
    e.target.reset();
    setNewTask("");
  };

  const setTemp = (id, name) => {
    setTempData({
      id: id,
      name: name,
    });
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const getData = () => {
    onSnapshot(tasksCollectionRef, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="app__container">
        <div className="app__container-header">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="app__container-contents">
          <div className="app__container-main">
            <div className="header-text">
              <h4>My Tasks</h4>
            </div>
            <div className="scrollable-div">
              {tasks &&
                tasks.map((task, id) => (
                  <div className="app__tasks" key={id}>
                    <div className="taskname">
                      <h6>{task.name}</h6>
                    </div>
                    <div className="deleteicon">
                      <>
                        <AiOutlineEdit
                          onClick={() => {
                            setTemp(task.id, task.name);
                          }}
                        />
                        <AiOutlineDelete
                          onClick={() => {
                            deleteTask(task.id);
                          }}
                        />
                      </>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="app__container-side">
            <Edit temp={tempData} />
            <Add
              createTask={createTask}
              setNewTask={setNewTask}
              newTask={newTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
