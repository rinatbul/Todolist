import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to eat', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Banana', isDone: true},
            {id: v1(), title: 'Apple', isDone: true},
            {id: v1(), title: 'Potato', isDone: false}
        ]
    })

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }
    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        const task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks})
    }
    const checkboxStateChange = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.map(t => t.id === id ? {...t, isDone} : t)
        setTasks({...tasks});
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter((tl) => tl.id != id));
        delete tasks[id];
        setTasks({...tasks});
    }
    const addTodolist = (title: string) => {
        let todolist:TodolistType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todolist,...todolists])
        setTasks({...tasks,[todolist.id]:[]})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        checkboxStateChange={checkboxStateChange}
                        removeTodolist={removeTodolist}
                        filter={tl.filter}/>
                })
            }
        </div>
    );
}

export default App;
