import React from "react";
import {FilterValueType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TasksPropsType[]
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}
type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}