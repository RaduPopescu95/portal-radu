const Pagination = ({ onPageChange, currentPage, totalPages }) => {
  console.log("currentPage...", currentPage);
  console.log("totalPages...", totalPages);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="page_navigation">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="flaticon-left-arrow"></span>
        </button>
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${number === currentPage ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(number)}
            disabled={number === currentPage}
          >
            {number}
          </button>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="flaticon-right-arrow"></span>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
