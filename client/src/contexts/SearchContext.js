import { createContext, useReducer } from "react";
import { searchInitialState, searchReducer } from "../reducers/searchReducer";

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [state, dispatch] = useReducer(searchReducer, searchInitialState)
    return (
        <SearchContext.Provider value={{state, dispatch}}>
            {children}
        </SearchContext.Provider>
    )

}
