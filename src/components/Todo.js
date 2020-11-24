import React, { useState, useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { BiSearch } from 'react-icons/bi'

function TodoForm() {

    const [state, setState] = useState({
        nameTodo: '',
        listFilter: [],
        todoList: [
            { done: false, name: 'hoc English' },
            { done: false, name: 'hoc France' }
        ],
        key: '',
        type: 'Add',
        keyEdit: null,
        iconSearch: (
            <BiSearch
                className='icon-search'
                onClick={() => handleSearch()}
            />
        ),
    });

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            listFilter: state.todoList,
        }))
    }, [state.todoList]);

    const listItems = state.listFilter.map((item, key) =>

        <div key={key} className='todo-name'>
            <div className='todo-right'>
                <input
                    type='checkbox'
                    className='click-checkbox'
                    onChange={(e) => handlCheckbox(e, key)}
                >
                </input>
                <div
                    className='name-todo'
                    style={{ textDecoration: item.done ? "line-through" : "" }}
                >
                    {item.name}
                </div>
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

    const handlCheckbox = (e, key) => {
        state.todoList[key].done = e.target.checked;
        let todo = state.todoList;

        setState((prevState) => ({
            ...prevState,
            todoList: todo
        }));
    }

    const handleEdit = (key, item) => {
        setState((prevState) => ({
            ...prevState,
            nameTodo: item.name,
            type: 'Edit',
            keyEdit: key,
        }));
    }

    const handleDelete = (key) => {
        if (state.type === 'Edit' && key === state.keyEdit) {
            setState((preState) => ({
                ...preState,
                nameTodo: '',
                type: 'Add',
            }));
        }
        const arr = state.todoList;
        arr.splice(key, 1);
        setState((prevState) => ({
            ...prevState,
            todoList: [...arr]
        }));
    }

    const handleChange = e => {
        if (state.type !== 'Search') {
            setState(prevState => ({
                ...prevState,
                nameTodo: e.target.value,
            }))
        } else {
            let arr = [];
            state.todoList.filter(item => {
                if (item.name.toLocaleLowerCase().search(e.target.value.toLocaleLowerCase()) !== -1) {
                    arr.push(item);
                }
            })

            setState(prevState => ({
                ...prevState,
                nameTodo: e.target.value,
                listFilter: arr,
            }));
        }

    };

    const handleSearch = () => {
        setState((prevState) => ({
            ...prevState,
            type: 'Search',
            iconSearch: '',
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
            if (arr[keyEdit]) {
                arr[keyEdit].name = name;
                setState(prevState => ({
                    ...prevState,
                    todoList: [...arr],
                    type: 'Add',
                    keyEdit: null,
                    nameTodo: '',
                }))
            } else {
                setState((preState) => ({
                    ...preState,
                    type: 'Add',
                }))
            }
        }
        if (type === 'Search') {
            setState((prevState) => ({
                ...prevState,
                type: 'Add',
                iconSearch: (
                    <BiSearch
                        className='icon-search'
                        onClick={() => handleSearch()}
                    />
                ),
            }));
        }
    };

    return (
        <div className='todo-list'>
            <div className='todo-header'>
                <div className='todo-title'>
                    <h2>Board Plan</h2>
                    {state.iconSearch}
                </div>

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
