import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';
function App() {
    let [tasks, setTasks] = useState([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ])
    let [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks;

    if (filter === 'active'){
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed'){
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    const changeFilter =(value:FilterValueType)=>{
        setFilter(value)
    }
    const removeTask =(id:string)=>{
        let filteredTasks = tasks.filter(t=>t.id !== id)
        setTasks(filteredTasks)
    }
    const addTask =(title:string)=>{
        const task = {id: v1(), title: title, isDone: false};
        const newTasks = [task,...tasks];
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
