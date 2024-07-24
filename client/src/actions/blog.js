import api from './index';
import {
  ADD_BLOG,
  REMOVE_BLOG,
  EDIT_BLOG,
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE
} from '../actionTypes/blog';


export const fetchBlogs = async (dispatch, username) => {
  dispatch({ type: FETCH_BLOGS_REQUEST });
  try {
    console.log("username", username)
    const response = await api.get(`/blogs/${username}`); 
    dispatch({ type: FETCH_BLOGS_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("err", error)

    dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });
  }
};


export const addBlog = async (dispatch, blog) => {
  try {
    const response = await api.post(`/blogs/`, blog); 
    dispatch({ type: ADD_BLOG, payload: response.data });
  } catch (error) {
    console.error('Failed to add blog:', error);
    dispatch({ type: FETCH_BLOGS_FAILURE, payload: error.message });

  }
};


export const editBlog = async (dispatch, blog) => {
  try {
    const response = await api.put(`/blogs/${blog.id}`, blog); 
    dispatch({ type: EDIT_BLOG, payload: response.data });
  } catch (error) {
    console.error('Failed to edit blog:', error);
  }
};

export const removeBlog = async (dispatch, blogId) => {
  try {
    await api.delete(`/blogs/${blogId}`); 
    dispatch({ type: REMOVE_BLOG, payload: blogId });
  } catch (error) {
    console.error('Failed to remove blog:', error);
  }
};
