import { createContext, useEffect, useReducer } from 'react';
import { authInitialState, authReducer } from '../reducers/authReducer';
import {checkSession, getLoggedIn} from '../actions/auth'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);


  useEffect( () => {
    getLoggedIn(dispatch)
    
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
