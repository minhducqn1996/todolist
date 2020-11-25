import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

Todolist.propTypes = {
    filter: PropTypes.array,
    checkBox: PropTypes.func,
    deleted: PropTypes.func,
    edit: PropTypes.func,
}

Todolist.defaultProps = {
    filter: [],
    checkBox: null,
    deleted: null,
    edit: null,
}

function Todolist(props) {
    const { filter, checkBox, deleted, edit } = props;

    const listItems = filter.map((item, key) =>
        <TodoItem checkBox={checkBox} deleted={deleted} edit={edit} submitItem={item} submitKey={key} key={key} />
    );

    return (
        <div className='handle-list'>
            {listItems}
        </div>
    )
}

export default Todolist;
