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
    LOGOUT_REQUEST,
    INIT_USER
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
        case INIT_USER:
            return {...state, username: action.payload.username, user: action.payload }
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
        case PROFILE_REQUEST:
            return { ...state, loading: true };
    
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload))

            return { ...state, loading: false, isAuthenticated: true, username: action.payload.username, user: action.payload };
    
        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
        case PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };
    
        case LOGOUT_REQUEST:
            return { ...state, isAuthenticated: false, username: null };
    
        case PROFILE_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.payload))
              
            return { ...state, loading: false, user: action.payload };
    
        default:
            return state;
    }
};
  