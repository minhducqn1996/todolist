import React, { useState } from 'react'

function Todo() {

    const [state, setState] = useState({
        nameTodo: '',
        todoList: [
            { name: 'hoc English' },
            { name: 'hoc France' },
        ],
        type: 'Add',
        keyTodo: null,
    });

    const listTodo = state.todoList.map((item, key) => {
        return (
            <li key={key}>
                {item.name}
                <button onClick={() => handleDelete(key)}>X</button>
                <button onClick={() => handleEdit(key, item)}>Edit</button>
            </li>
        );
    })

    const handleEdit = (key, item) => {
        setState((prevState) => ({
            ...prevState,
            nameTodo: item.name,
            type: 'Edit',
            keyTodo: key,
        }))
    };

    const handleDelete = (key) => {
        let arr = state.todoList;
        arr.splice(key, 1);
        setState((prevState) => ({
            ...prevState,
            todoList: [...arr]
        }))
    };

    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            nameTodo: e.target.value,
        }))
    }

    const handleChangeList = (names, type, key) => {
        let arr = state.todoList;

        if (type === 'Add') {
            if (names.trim().length > 0) {
                arr.push({ name: names })
                setState((prevState) => ({
                    ...prevState,
                    todoList: [...arr]
                }))
            } else {
                alert('you must write something');
            }
        } else {
            arr[key].name = names;

            setState((prevState) => ({
                ...prevState,
                todoList: [...arr],
                type: 'Add',
            }));
        }

    }



    return (
        <div>
            <div>
                <input
                    type='text'
                    placeholder='Nhap vao'
                    value={state.nameTodo}
                    onChange={handleChange}
                >
                </input>
                <button
                    onClick={() => handleChangeList(state.nameTodo, state.type, state.keyTodo)}
                >
                    {state.type}
                </button>
            </div>

            <ul>
                {listTodo}
            </ul>
        </div>
    )
}

export default Todo
