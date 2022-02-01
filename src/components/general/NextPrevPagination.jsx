import React from 'react';

function NextPrevPagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}) {
  return (
    <section className="pagination d-flex justify-content-between mt-3">
      <button
        className="btn btn-info"
        onClick={onPrevPage}
        disabled={currentPage === 1 ? true : false}
      >
        Previous
      </button>
      <button
        className="btn btn-info"
        onClick={onNextPage}
        disabled={currentPage === totalPages ? true : false}
      >
        Next
      </button>
    </section>
  );
}

export default NextPrevPagination;
