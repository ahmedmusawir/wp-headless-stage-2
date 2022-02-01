import React from 'react';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';

function NumericPagination({ totalPages, currentPage, onPageChange }) {
  const pagesCount = totalPages;
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  console.log('Pages:', pages);

  let items = [];

  pages.map((page) => {
    return items.push(
      <Pagination.Item
        key={page}
        active={currentPage === page}
        activeLabel=""
        style={{ margin: '.20rem' }}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  });

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

NumericPagination.propTypes = {};

export default NumericPagination;
