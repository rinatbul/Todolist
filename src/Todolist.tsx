import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete, HighlightOff} from "@material-ui/icons";

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
        const onRemoveTaskHandler = ()=>props.removeTask(t.id, props.id)
        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.checkboxStateChange(t.id, newIsDoneValue, props.id)
        }
        const onTitleChangeHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
        }

        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
            <Checkbox checked={t.isDone} onChange={onChangeStatus} color={"primary"}/>
            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onRemoveTaskHandler} aria-label="delete">
                <HighlightOff/>
            </IconButton>
        </div>
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
                <IconButton onClick={removeTodolist} aria-label="delete">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasks}
            </div>
            <div style={{marginTop:"10px"}}>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

