// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../app/store";

// interface AuthState{
//     accessToken: string | null;
//     id: string | null;
//     role: string | null;

// }

// const initialState = {id: null, role: null, accessToken: null} as AuthState

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setAuth(state, action){
//             console.log('set auth', state)
//             state.accessToken = action.payload.accessToken
//             state.id = action.payload.id
//             state.role = action.payload.role 
//             localStorage.setItem('token', state.accessToken as string)
//         },

//         clearAuth(state){
//             localStorage.removeItem('accessToken')

//         }

//     }
// })

// export const {setAuth, clearAuth, getAuth} = authSlice.actions
// export const authSelector = (state: RootState) => state.auth
// export default authSlice.reducer