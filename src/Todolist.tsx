import React, {ChangeEvent, useState} from "react";
import {FilterValueType} from "./App";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksPropsType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    checkboxStateChange: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
}
export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addTask = () => {
        if (title.trim() != '') {
            props.addTask(title, props.id)
            setTitle('');
        } else {
            setError('ERROR')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    const tasks = props.tasks.map((t) => {
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.checkboxStateChange(t.id, newIsDoneValue, props.id)
        }
        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeStatus}
            /><span>{t.title}</span>
            <button onClick={() => {
                props.removeTask(t.id, props.id)
            }}>x
            </button>
        </li>
    })

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x
                </button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       type="text"/>
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className='error'>ERROR</div>}
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}