import { createContext, useReducer, useEffect } from 'react';
import {blogReducer, initialState} from '../reducers/blogReducer'
export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, initialState);
    
    return (
      <BlogContext.Provider value={{ state, dispatch }}>
        {children}
      </BlogContext.Provider>
    );
  };