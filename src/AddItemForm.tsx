import React, {ChangeEvent, useState} from "react";

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
    return <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyDown={onKeyPressHandler}
               type="text"/>
        <button onClick={addTask}>+</button>
        {error && <div className='error'>ERROR</div>}
    </div>

}