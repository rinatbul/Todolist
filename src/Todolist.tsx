import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    id: string
    title: string
    tasks: TasksPropsType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    checkboxStateChange: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: string
}
export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    const tasks = props.tasks.map((t) => {
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.checkboxStateChange(t.id, newIsDoneValue, props.id)
        }
        const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
        }

        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onChangeStatus}/>
            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
            <button onClick={() => {
                props.removeTask(t.id, props.id)
            }}>x
            </button>
        </li>
    })
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onChangeTodolistTitle = (title:string) => {
        props.changeTodolistTitle(props.id, title)
    }
    return (
        <div>
            <h3><EditableSpan value={props.title} onChange={onChangeTodolistTitle}/>
                <button onClick={removeTodolist}>x
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>
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

