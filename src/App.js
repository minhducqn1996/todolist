import React, { useState, useEffect } from 'react';
import './App.css';

import TodoList from './components/Todolist';
import TodoForm from './components/TodoForm';

const App = () => {

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
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      listFilter: state.todoList,
    }))
  }, [state.todoList]);

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
      let arr = state.todoList.filter(item => item.name.toLocaleLowerCase().search(e.target.value.toLocaleLowerCase()) !== -1)
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
      }));
    }
  };

  return (
    <div className='App'>
      <div className='todo-list'>

        <TodoForm
          onFormChange={handleChange}
          onFormHandleChange={onHandleChange}
          onFormHandleSearch={handleSearch}
          nameTodo={state.nameTodo}
          ofType={state.type}
          keyEdit={state.keyEdit}
        />
        <TodoList
          filter={state.listFilter}
          checkBox={handlCheckbox}
          deleted={handleDelete}
          edit={handleEdit}
        />

      </div>

    </div>
  )
}

export default App;
