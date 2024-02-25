import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Paginate = ({ totalPages, paginate, currentPage, prevPage, nextPage }) => {
    const pageNumbers = Array.from({ length: Math.ceil(totalPages) }, (_, i) => i + 1);

    return (
        <div className="">
            <div className="flex justify-end">
                {currentPage > 1 && (
                    <button onClick={prevPage} className="px-4 py-2 ml-2 bg-sky-600 text-white rounded">
                        <FaAngleLeft />
                    </button>
                )}
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 ml-2 ${currentPage === number ? ' text-white' : 'bg-gray-300'
                            } rounded`}
                    >
                        {number}
                    </button>
                ))}
                {currentPage === totalPages || (
                    <button onClick={nextPage} className="px-4 py-2 ml-2 bg-sky-600 text-white rounded">
                        <FaAngleRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Paginate;
