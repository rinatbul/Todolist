import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addTask = () => {
        if (title.trim() != '') {
            props.addItem(title)
            setTitle('');
        } else {
            setError('Incorrect entry')
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
    return <div>
        <TextField id="standard-basic"
                   variant={"outlined"}
                   helperText={error}
                   label="Type value"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   type="text"/>
        <IconButton color={"primary"}  onClick={addTask}>
            <AddBox/>
        </IconButton>
    </div>

}