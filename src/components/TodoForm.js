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

    const onHandleChange = (e, nameTodo, ofType, keyEdit) => {
        if (!onFormHandleChange) return;
        onFormHandleChange(e, nameTodo, ofType, keyEdit)
    }

    const handleSearch = () => {
        if (!onFormHandleSearch) return;
        onFormHandleSearch();
    }

    return (
        <div className='todo-header'>
            <div className='todo-title'>
                <h2>Board Plan</h2>
                {ofType !== 'Search' && <BiSearch className='icon-search' onClick={handleSearch} />}
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
                    onClick={(e) => onHandleChange(e, nameTodo, ofType, keyEdit)}
                >
                    {ofType}
                </button>
            </form>
        </div>
    )
}

export default TodoForm;
