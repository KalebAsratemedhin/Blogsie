import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    BLOGS_REQUEST,
    BLOGS_SUCCESS,
    BLOGS_FAILURE,

  } from '../actionTypes/search';

export const searchInitialState = {
    users: [],
    blogs: [],
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
    
        default:
            return state;
    }
};
  