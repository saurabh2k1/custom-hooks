import React, { useState } from 'react';

interface PaginationProps<T> {
    data: T[];
    itemsPerPage: number;
    onChangePage: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps<any>> = ({
    data,
    itemsPerPage,
    onChangePage,
    className,
}) => {
    const [currentPage, setCurrentPage] = useState(0);
    
    const TotalPages = Math.ceil(data.length / itemsPerPage);
    
    const handlePageChange = (page: number) => {
       if (page >= 1 && page <= TotalPages) {
        setCurrentPage(page);
        onChangePage(page);
       }
    };

    const handlePreviousPage = () => {
        handlePageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        handlePageChange(currentPage + 1);
    };

    return (
        <nav className={`pagination ${className || ''}`}>
            <ul className="pagination flex items-center -space-x-px h-10 text-base">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}` }>
                    <button onClick={handlePreviousPage} className='flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        <span className="sr-only"> Previous </span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                </li>
                {Array.from({length: TotalPages}, (_, index) => index + 1).map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber? 'active' : ''}`}>
                        <button 
                            className={` ${currentPage === pageNumber? 
                                'z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' :
                                'page-link flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' }` }
                            disabled={currentPage === pageNumber} 
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === TotalPages ? 'disabled' : ''}`}>
                    <button
                        onClick={handleNextPage}
                        className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                        <span className='sr-only'>Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                </li>
            </ul>
            
            
        </nav>
    );
};

export default Pagination;