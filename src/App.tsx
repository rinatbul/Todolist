import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

const tasks = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JavaScript', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
]
const tasks2 = [
    {id: 1, title: 'Banana', isDone: true},
    {id: 2, title: 'Apple', isDone: true},
    {id: 3, title: 'Potato', isDone: false},
]

function App() {

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks}/>
            <Todolist title='What to eat' tasks={tasks2}/>
        </div>
    );
}

export default App;
