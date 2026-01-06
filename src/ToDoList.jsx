import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // 📌 Escuchar tareas en tiempo real
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text
            }));
            setTasks(tasksData);
        });

        return () => unsub(); // limpiar listener
    }, []);

    function HandleInputChange(event) {
        setNewTask(event.target.value);
    }

    // 📌 Agregar tarea a Firebase
    async function AddTask() {
        if (newTask.trim() !== "") {
            await addDoc(collection(db, "tasks"), {
                text: newTask
            });
            setNewTask("");
        }
    }

    // 📌 Eliminar una tarea por ID
    async function DeleteTask(id) {
        await deleteDoc(doc(db, "tasks", id));
    }

    // 📌 Eliminar todas las tareas
    async function DeleteAllTasks() {
        tasks.forEach(async (task) => {
            await deleteDoc(doc(db, "tasks", task.id));
        });
    }

    return (
        <div className="to-do-list">
            <h1>Fun Things</h1>

            <div className="task-input">
                <input 
                    type="text" 
                    placeholder="Enter a task..." 
                    value={newTask} 
                    onChange={HandleInputChange} 
                />
                <div>
                    <button className="add-button" onClick={AddTask}>Add</button>
                    <button className="delete-button" onClick={DeleteAllTasks}>Delete All</button>
                </div>
            </div>

            <ol>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span className="text">{task.text}</span>
                        <button className="delete-button" onClick={() => DeleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
