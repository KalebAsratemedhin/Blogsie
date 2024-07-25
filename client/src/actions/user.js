import {
    REQUEST,
    SEARCH_SUCCESS,
    BLOGS_SUCCESS,
    FAILURE,
    SELECT_USER,
    FOLLOW_SUCCESS,
    UNFOLLOW_SUCCESS


  } from '../actionTypes/user';
  import api from './index'

  export const searchUsers = async (dispatch, searchQuery) => {
    dispatch(REQUEST)
    try {
        const response = await api.get('/search/users', {
          params: { q: searchQuery }
        });

        if (response.status == 200){
            dispatch({type: SEARCH_SUCCESS, payload: response.data})
        }
      } catch (error) {
        dispatch({type: FAILURE, payload: error.response.data})
      }
  }

  export const selectUser = async (dispatch, selected, user) => {
    dispatch({type: SELECT_USER, payload: {selected, user}})
  }


  export const fetchSelectedBlogs = async (dispatch, username) => {
    dispatch({ type: REQUEST });
    try {
      const response = await api.get(`/blogs/${username}`); 
      dispatch({ type: BLOGS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FAILURE, payload: error.message });
    }
  };
  
  export const setSelectedBlogs = async (dispatch, blogs) => {
    dispatch({type: BLOGS_SUCCESS, payload: blogs})
  }


  export const followUser = async (dispatch, followeeUsername) => {
    dispatch({ type: REQUEST });
    
    try{
        const response = await api.post('/follow', {followeeUsername})

        if(response.status == 201){
            dispatch({type: FOLLOW_SUCCESS, payload: response.data})
        }

    } catch(error){
        dispatch({ type: FAILURE, payload: error.message });
    }
  }

  export const unfollowUser = async (dispatch, followeeUsername) => {
    dispatch({ type: REQUEST });
    
    try{
        const response = await api.delete(`/follow/${followeeUsername}`)

        if(response.status == 200){
            dispatch({type: UNFOLLOW_SUCCESS, payload: response.data})
        }

    } catch(error){
        dispatch({ type: FAILURE, payload: error.message });
    }
  }