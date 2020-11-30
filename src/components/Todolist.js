import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Pagination from './Pagination';


Todolist.propTypes = {
    filter: PropTypes.array,
    checkBox: PropTypes.func,
    deleted: PropTypes.func,
    edit: PropTypes.func,
    onClick: PropTypes.func,
    pageChangeValue: PropTypes.object,
}

Todolist.defaultProps = {
    filter: [],
    checkBox: null,
    deleted: null,
    edit: null,
    onClick: null,
    pageChangeValue: null,
}

function Todolist(props) {
    const { filter, checkBox, deleted, edit, onClick, pageChangeValue } = props;

    const { page, limit } = pageChangeValue;
    const valueDisible = Math.ceil(filter.length / limit);

    const currentLast = page * limit;
    const currentFirst = currentLast - limit;

    const arr = filter.slice(currentFirst, currentLast);

    return (
        <div className='handle-list'>
            {
                arr.map((item, key) =>
                    <TodoItem checkBox={checkBox} deleted={deleted} edit={edit} submitItem={item} submitKey={key} key={key} />
                )
            }
            <Pagination
                valueDisible={valueDisible}
                pages={page}
                filter={filter}
                onClick={onClick}
            />

        </div>
    )
}

export default Todolist;
