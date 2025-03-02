import React from 'react';
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalResults, resultsPerPage = 10, onPageChange }) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  
  // If there's only one page or no results, don't render pagination
  if (totalPages <= 1) return null;
  
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Calculate which pages to show
      if (currentPage <= 3) {
        // If we're near the start
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // If we're near the end
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // We're somewhere in the middle
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <div className="alert alert-info w-100 text-center mb-3">
        <strong>Showing page {currentPage} of {totalPages}</strong> - Browse through all {totalResults} results
      </div>
      
      <nav aria-label="Movie search pagination" className="mb-4">
        <ul className="pagination pagination-lg">
          {/* First page button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <FaAngleDoubleLeft />
            </button>
          </li>
          
          {/* Previous button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <FaAngleLeft />
            </button>
          </li>
          
          {/* Page numbers */}
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
          
          {/* Next button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <FaAngleRight />
            </button>
          </li>
          
          {/* Last page button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <FaAngleDoubleRight />
            </button>
          </li>
        </ul>
      </nav>
      
      {totalPages > 10 && (
        <div className="d-flex align-items-center mb-4">
          <span className="me-2">Jump to page:</span>
          <select
            className="form-select form-select-sm w-auto"
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;