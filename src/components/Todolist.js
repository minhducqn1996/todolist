import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';

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


    const listItems = arr.map((item, key) =>
        <TodoItem checkBox={checkBox} deleted={deleted} edit={edit} submitItem={item} submitKey={key} key={key} />
    );

    const handleClick = (pages) => {
        if (!onClick) return;
        return () => {
            onClick(pages);
        }
    }


    const isActive = (page, i) => {
        return `button-number ${page === i ? 'active' : ''}`;
    }

    const numberPagination = (valueDisible) => {
        const listNumber = [];
        for (let i = 1; i <= valueDisible; i++) {
            listNumber.push(
                <button
                    href='#'
                    type='button'
                    className={isActive(page, i)}
                    onClick={handleClick(i)}
                >
                    {i}
                </button>
            )
        }

        return listNumber;
    }

    return (
        <div className='handle-list'>
            {listItems}
            {
                filter.length >= 5 && (
                    <div className='button-control'>
                        <button
                            type='button'
                            className='button-pre'
                            disabled={1 >= page}
                            onClick={handleClick(page - 1)}
                        >
                            <FcPrevious />
                        </button>
                        {numberPagination(valueDisible)}
                        <button
                            type='button'
                            className='button-next'
                            disabled={page >= valueDisible}
                            onClick={handleClick(page + 1)}
                        >
                            <FcNext />
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default Todolist;
