import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    BLOGS_REQUEST,
    BLOGS_SUCCESS,
    BLOGS_FAILURE,
    SELECT_USER

  } from '../actionTypes/search';

export const searchInitialState = {
    users: [],
    blogs: null,
    selectedUser: null,
    loading: false,
    error: null,
  };



export const searchReducer = (state, action) => {
    switch (action.type) {
        case BLOGS_REQUEST:
        case SEARCH_REQUEST:
            return { ...state, loading: true };
    
        case BLOGS_SUCCESS:
            return { ...state, loading: false, blogs: action.payload };


        case SEARCH_SUCCESS:
            return { ...state, loading: false, users: action.payload };
    
        case BLOGS_FAILURE:
        case SEARCH_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case SELECT_USER:
            return {...state, selectedUser: action.payload, blogs: null}
            
    
        default:
            return state;
    }
};
  