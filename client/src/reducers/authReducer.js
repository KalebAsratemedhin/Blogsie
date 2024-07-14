import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST
  } from '../actionTypes/auth';

export const authInitialState = {
    user: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };



export const authReducer = (state, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case PROFILE_REQUEST:
            return { ...state, loading: true };
    
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            console.log("success login")
            return { ...state, loading: false, isAuthenticated: true, username: action.payload };
    
        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
        case PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };
    
        case LOGOUT_REQUEST:
            return { ...state, isAuthenticated: false, username: null };
    
        case PROFILE_SUCCESS:
            return { ...state, loading: false, user: action.payload };
    
        default:
            return state;
    }
};
  