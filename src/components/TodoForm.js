import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { BiSearch } from 'react-icons/bi'

function TodoForm() {

    const [state, setState] = useState({
        nameTodo: '',
        searchTodo: '',
        listFilter: [],
        todoList: [
            { name: 'hoc English' },
            { name: 'hoc France' }
        ],
        key: '',
        type: 'Add',
        keyEdit: null,
    });

    const listItems = state.todoList.map((item, key) =>
        <div key={key} className='todo-name'>
            <div>
                {item.name}
            </div>
            <div className='icon-bt'>
                <RiCloseCircleLine
                    onClick={() => handleDelete(key)}
                    className='delete-icon'
                />
                <TiEdit
                    onClick={() => handleEdit(key, item)}
                    className='edit-icon'
                />
            </div>
        </div>
    );

    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    const result = words.filter(word => word.length > 6);

    console.log(result);


    const handleEdit = (key, item) => {
        setState((prevState) => ({
            ...prevState,
            nameTodo: item.name,
            type: 'Edit',
            keyEdit: key,
        }));
    }

    const handleDelete = (key) => {
        const arr = state.todoList;
        arr.splice(key, 1);
        setState((prevState) => ({
            ...prevState,
            todoList: [...arr]
        }));
    }

    const handleChange = e => {
        setState(prevState => ({
            ...prevState,
            nameTodo: e.target.value,
            searchTodo: e.target.value,
        }))
    };

    const handleSearch = () => {
        setState((prevState) => ({
            ...prevState,
            type: 'Search',
        }));
    }

    const onHandleChange = (e, name, type, keyEdit) => {
        e.preventDefault();
        let arr = state.todoList;
        if (type === 'Add') {
            if (name.trim().length > 0) {
                arr.push({ name: name })
                setState(prevState => ({
                    ...prevState,
                    nameTodo: '',
                    todoList: [...arr],
                }))
            } else {
                alert('you must write something');
            }
        }
        if (type === 'Edit') {
            arr[keyEdit].name = name;
            setState(prevState => ({
                ...prevState,
                todoList: [...arr],
                type: 'Add',
                keyEdit: null,
                nameTodo: '',
            }))
        }
        if (type === 'Search') {
            setState((prevState) => ({
                ...prevState,
                type: 'Add'
            }));
        }
    };



    return (
        <div className='todo-list'>
            <div className='todo-header'>
                <h2>Board Plan</h2>
                <BiSearch
                    className='icon-search'
                    onClick={() => handleSearch()}
                />
                <form className='todo-form'>
                    <input
                        type='text'
                        placeholder='To do List'
                        name='text'
                        onChange={handleChange}
                        value={state.nameTodo}
                        className='todo-input'
                    >
                    </input>

                    <button
                        className='todo-button'
                        onClick={(e) => onHandleChange(e, state.nameTodo, state.type, state.keyEdit)}
                    >
                        {state.type}
                    </button>
                </form>
            </div>

            <div className='handle-list'>
                {listItems}
            </div>

        </div>

    )
}

export default TodoForm
