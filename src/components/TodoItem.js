import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import PropTypes from 'prop-types';

TodoItem.propTypes = {
    checkBox: PropTypes.func,
    deleted: PropTypes.func,
    edit: PropTypes.func,
    submitItem: PropTypes.object,
    submitKey: PropTypes.number,
}

TodoItem.defaultProps = {
    checkBox: null,
    deleted: null,
    edit: null,
    submitItem: null,
    submitKey: null,
}

function TodoItem(props) {
    const { checkBox, deleted, edit, submitItem, submitKey } = props;


    const handlCheckbox = (submitKey) => {
        if (!checkBox) return;
        return (e) => (
            checkBox(e, submitKey)
        );

    }

    const handleDelete = (submitKey, deleted) => {
        if (!deleted) return;
        return () => (
            deleted(submitKey)
        );

    }

    const handleEdit = (submitKey, submitItem, edit) => {
        if (!edit) return;
        return () => (
            edit(submitKey, submitItem)
        );

    }

    return (
        <div className='todo-name'>
            <div className='todo-right'>
                <input
                    type='checkbox'
                    className='click-checkbox'
                    onChange={() => handlCheckbox(submitKey)}
                >
                </input>
                <div
                    className='name-todo'
                    style={{ textDecoration: submitItem.done ? "line-through" : "" }}
                >
                    {submitItem.name}
                </div>
            </div>
            <div className='icon-bt'>
                <RiCloseCircleLine
                    onClick={handleDelete(submitKey, deleted)}
                    className='delete-icon'
                />
                <TiEdit
                    onClick={handleEdit(submitKey, submitItem, edit)}
                    className='edit-icon'
                />
            </div>
        </div>
    )
}

export default TodoItem;
