import {
  ADD_BLOG,
  REMOVE_BLOG,
  EDIT_BLOG,
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE
} from '../actionTypes/blog';

export const initialState = {
  blogs: null,
  loading: false,
  error: null,
};

export const blogReducer = (state, action) => {
  switch (action.type) {
    case ADD_BLOG:
      return { ...state, blogs: [...state.blogs, action.payload] };
    case REMOVE_BLOG:
      return { ...state, blogs: state.blogs.filter(blog => blog.id !== action.payload) };
    case EDIT_BLOG:
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog.id === action.payload.id ? { ...blog, ...action.payload } : blog
        ),
      };
    case FETCH_BLOGS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BLOGS_SUCCESS:
      return { ...state, blogs: action.payload, loading: false };
    case FETCH_BLOGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
