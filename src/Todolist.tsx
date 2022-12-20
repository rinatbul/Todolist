import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TasksPropsType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}
type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('');
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler =(e:React.KeyboardEvent<HTMLInputElement>)=>{
        e.code === 'Enter' ? addTask() : null
    }
    const onAllClickHandler =()=> props.changeFilter('all')
    const onActiveClickHandler =()=> props.changeFilter('active')
    const onCompletedClickHandler =()=> props.changeFilter('completed')

    const tasks = props.tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
        <button onClick={() => {props.removeTask(t.id)}}>x</button>
    </li>)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       type="text"/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}