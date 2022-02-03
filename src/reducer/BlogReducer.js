export const BlogReducer = (state, action) => {
  // console.log('ACTION:', action);
  // console.log('STATE:', state);
  switch (action.type) {
    case 'FETCH_POSTS':
      console.log('FETCH_POSTS PAYLOAD', action.payload);
      return {
        posts: action.payload.posts,
        isPending: action.payload.isPending,
        pageNumber: action.payload.pageNumber,
        totalPages: action.payload.totalPages,
        perPage: action.payload.perPage,
      };

    case 'LOAD_MORE': {
      console.log('LOAD MORE PAYLOAD', action.payload);
      return {
        posts: action.payload.posts,
        pageNumber: action.payload.pageNumber,
        totalPages: action.payload.totalPages,
        perPage: action.payload.perPage,
      };
    }

    case 'ADD_POST':
      return {
        posts: [...state.posts, action.payload],
      };

    case 'EDIT_POST':
      console.log('EDIT_POST ACTION:', action);
      console.log('EDIT_POST STATE:', state);
      const newPosts = state.posts.map((post) => {
        return post.id === action.payload.post.id
          ? { ...post, ...action.payload.post }
          : post;
      });
      console.log('NEW POSTS AFTER EDIT:', newPosts);
      return {
        posts: [...newPosts],
        isPending: action.payload.isPending,
        pageNumber: action.payload.pageNumber,
        totalPages: action.payload.totalPages,
        perPage: action.payload.perPage,
      };

    case 'REMOVE_POST':
      return {
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    default:
      return state;
  }
};
