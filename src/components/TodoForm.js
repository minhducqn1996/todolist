import React from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';

TodoForm.propTypes = {
    onFormChange: PropTypes.func,
    onFormHandleChange: PropTypes.func,
    nameTodo: PropTypes.string,
    ofType: PropTypes.string,
    keyEdit: PropTypes.number,
    onFormHandleSearch: PropTypes.func,
}

TodoForm.defaultProps = {
    onFormChange: null,
    onFormHandleChange: null,
    nameTodo: '',
    ofType: '',
    keyEdit: null,
    onFormHandleSearch: '',
}

function TodoForm(props) {
    const { onFormChange, onFormHandleChange, nameTodo, ofType, keyEdit, onFormHandleSearch } = props;

    const handleChange = (e) => {
        if (!onFormChange) return;
        onFormChange(e);
    };

    const onHandleChange = (nameTodo, ofType, keyEdit, onFormHandleChange) => {
        if (!onFormHandleChange) return;
        return (e) => {
            onFormHandleChange(e, nameTodo, ofType, keyEdit)
        }
    }

    const handleSearch = (onFormHandleSearch) => {
        if (!onFormHandleSearch) return;
        onFormHandleSearch();
    }

    return (
        <div className='todo-header'>
            <div className='todo-title'>
                <h2>Board Plan</h2>
                {ofType !== 'Search' && <BiSearch className='icon-search' onClick={() => handleSearch(onFormHandleSearch)} />}
            </div>

            <form className='todo-form'>
                <input
                    type='text'
                    placeholder='To do List'
                    name='text'
                    onChange={handleChange}
                    value={nameTodo}
                    className='todo-input'
                >
                </input>

                <button
                    className='todo-button'
                    onClick={onHandleChange(nameTodo, ofType, keyEdit, onFormHandleChange)}
                >
                    {ofType}
                </button>
            </form>
        </div>
    )
}

export default TodoForm;
