import React, {useState} from 'react';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
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
        // get array of Todolist by ID
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
        let todolist: TodolistType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        // get array of Todolist by ID
        let todolistTasks = tasks[todolistId];
        // find Task by ID
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            //if found - change Task title
            task.title = newTitle;
            //renew Tasks state
            setTasks({...tasks});
        }
    }
    const changeTodolistTitle = (id: string, title: string) => {
        //todolist search by ID
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            //if todolist found - change title
            todolist.title = title
            //renew Todolists state
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
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
                            return <Grid item>
                                <Paper elevation={3} style={{padding:"10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        checkboxStateChange={checkboxStateChange}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={tl.filter}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
