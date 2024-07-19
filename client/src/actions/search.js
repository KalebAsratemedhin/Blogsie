import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    BLOGS_REQUEST,
    BLOGS_SUCCESS,
    BLOGS_FAILURE,
    SELECT_USER

  } from '../actionTypes/search';
  import api from './index'

  export const searchUsers = async (dispatch, searchQuery) => {
    console.log("hello search", searchQuery)
    dispatch(SEARCH_REQUEST)
    try {
        const response = await api.get('/search/users', {
          params: { q: searchQuery }
        });
        console.log("search", response)

        if (response.status == 200){
            dispatch({type: SEARCH_SUCCESS, payload: response.data})
        }
      } catch (error) {
        dispatch({type: SEARCH_FAILURE, payload: error.response.data})
      }
  }

  export const selectUser = async (dispatch, user) => {
    dispatch({type: SELECT_USER, payload: user})
  }


  export const fetchSelectedBlogs = async (dispatch, username) => {
    dispatch({ type: BLOGS_REQUEST });
    try {
      const response = await api.get(`/blogs/${username}`); 
      dispatch({ type: BLOGS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: BLOGS_FAILURE, payload: error.message });
    }
  };
  
  export const setSelectedBlogs = async (dispatch, blogs) => {
    dispatch({type: BLOGS_SUCCESS, payload: blogs})
  }