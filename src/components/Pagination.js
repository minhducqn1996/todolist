import React from 'react';
import PropTypes from 'prop-types';
import { FcNext } from 'react-icons/fc';
import { FcPrevious } from 'react-icons/fc';

Pagination.propTypes = {
    valueDisible: PropTypes.number,
    pages: PropTypes.number,
    filter: PropTypes.array,
    onClick: PropTypes.func,
};

Pagination.defaultProps = {
    valueDisible: null,
    pages: null,
    filter: null,
    onClick: null,
};

function Pagination(props) {
    const { valueDisible, pages, filter, onClick } = props;

    const numberPagination = (onClick, valueDisible, pages) => {
        const listNumber = [];
        for (let i = 1; i <= valueDisible; i++) {
            listNumber.push(
                <button
                    key={i}
                    href='#'
                    type='button'
                    className={isActive(pages, i)}
                    onClick={handleClick(onClick, i)}
                >
                    {i}
                </button>
            )
        }

        return listNumber;
    }

    const handleClick = (onClick, pages) => {
        if (!onClick) return;
        return () => {
            onClick(pages);
        }
    }


    const isActive = (pages, i) => {
        return `button-number ${pages === i ? 'active' : ''}`;
    }

    return (
        <>
            {
                filter.length >= 5 && (
                    <div className='button-control'>
                        <button
                            type='button'
                            className='button-pre'
                            disabled={1 >= pages}
                            onClick={handleClick(onClick, pages - 1)}
                        >
                            <FcPrevious />
                        </button>
                        {numberPagination(onClick, valueDisible, pages)}
                        <button
                            type='button'
                            className='button-next'
                            disabled={pages >= valueDisible}
                            onClick={handleClick(onClick, pages + 1)}
                        >
                            <FcNext />
                        </button>
                    </div>
                )
            }
        </>
    );
}

export default Pagination;