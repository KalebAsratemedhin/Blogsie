import api from "./index";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  INIT_USER
} from '../actionTypes/auth';

export const getLoggedIn = (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if(user){
    dispatch({ type: INIT_USER, payload: user });

  }
  
}

export const checkSession = async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await api.get('/auth/check-session');

    if(response.data && response.data.username){
      localStorage.setItem('username', response.data.username)
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.username });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};

export const signup = async (dispatch, userData) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const response = await api.post('/auth/signup', userData);

    if(response.status == 201){
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data.user });
    }

  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.response.data });
  }
};

export const login = async (dispatch, credentials) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await api.post('/auth/login', credentials);

    if(response.status === 201){
      // localStorage.setItem('username', response.data.username)
      console.log("res log", response.data)
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
      
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
  }
};

export const logout = async (dispatch) => {
  await api.post('/auth/logout');
  dispatch({ type: LOGOUT_REQUEST });
  localStorage.removeItem('username')

};

export const getProfile = async (dispatch, username) => {
  dispatch({ type: PROFILE_REQUEST });
  try {
    const response = await api.get(`/profile/${username}`);
    dispatch({ type: PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: PROFILE_FAILURE, payload: error.response.data });
  }
};
