import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    BLOGS_REQUEST,
    BLOGS_SUCCESS,
    BLOGS_FAILURE,

  } from '../actionTypes/search';
  import api from './index'

  export const searchUsers = async (dispatch, searchQuery) => {
    dispatch(SEARCH_REQUEST)
    try {
        const response = await api.get('/search/users', {
          params: { q: searchQuery }
        });

        if (response.status == 200){
            dispatch({type: SEARCH_SUCCESS, payload: response.data})
        }
      } catch (error) {
        dispatch({type: SEARCH_FAILURE, payload: error.response.data})
      }
  }