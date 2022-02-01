import React from 'react';
import wp from '../../services/HttpService';

export const loadMorePosts = async (pageNumber, perPage, totalPages) => {
  const request = wp.posts();
  console.log('Current Pg - loadMorePosts:', pageNumber);

  if (pageNumber > 1) {
    request.perPage(perPage).page(pageNumber);
  }

  try {
    const newPosts = await request.get();
    console.log('New Posts - loadMorePosts:', newPosts);
    return {
      newPosts,
      newPageNumber: totalPages > pageNumber ? pageNumber + 1 : null,
    };
  } catch (error) {
    // print error
    console.log(error);
    return [];
  }
};

function LoadMorePagination({ onLoadMore }) {
  return (
    <section className="loadmore text-center">
      <button
        className="btn btn-info btn-lg mt-3 mb-5 px-5 py-4"
        onClick={onLoadMore}
      >
        Load More...
      </button>
    </section>
  );
}

export default LoadMorePagination;
