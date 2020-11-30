import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import TodoList from './components/Todolist';
import TodoForm from './components/TodoForm';

const App = () => {
  const typeStringChange = useRef(null);

  const [state, setState] = useState(() => {

    const initialFilter = JSON.parse(localStorage.getItem('Box-Filter')) || [];

    return {
      nameTodo: '',
      listFilter: [],
      todoList: [...initialFilter],
      key: '',
      type: 'Add',
      keyEdit: null,
      pageChange: {
        page: 1,
        limit: 5,
      }
    }
  });

  const handlePageValue = (pages) => {
    setState((preState) => ({
      ...preState,
      pageChange: {
        page: pages,
        limit: 5,
      }
    }))
  }

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

  const trigerFilter = (value) => {
    if (typeStringChange) {
      clearTimeout(typeStringChange.current)
    }

    typeStringChange.current = setTimeout(() => {
      let arr = state.todoList.filter(item => item.name.toLocaleLowerCase().search(value.toLocaleLowerCase()) !== -1)

      setState(prevState => ({
        ...prevState,
        listFilter: [...arr],
      }));
    }, 300);

    setState((preState) => ({
      ...preState,
      nameTodo: value,
    }))
  }

  const handleChange = e => {
    const value = e.target.value;

    if (state.type === 'Search') {
      trigerFilter(value)
    }

    setState(prevState => ({
      ...prevState,
      nameTodo: value,
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
    if (type !== 'Search') {
      localStorage.setItem('Box-Filter', JSON.stringify(arr))
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
          onClick={handlePageValue}
          pageChangeValue={state.pageChange}
        />

      </div>

    </div>
  )
}

export default App;
