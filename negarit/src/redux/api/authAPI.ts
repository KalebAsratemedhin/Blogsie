import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse, SigninCredential, SignupCredential } from "../types/auth";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}/auth`,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<AuthResponse, SignupCredential >({
            query: (credential) => ({
                url: '/signup',
                method: 'Post',
                body: credential,
                
            })
        }),
        signin: builder.mutation<AuthResponse, SigninCredential >({
            query: (credential) => ({
                url: '/signin',
                method: 'Post',
                body: credential,
                
            })
        }),
        signout: builder.mutation<void, void >({
            query: () => ({
                url: '/signout',
                method: 'Post'
                
            })
        }),
        
        googleAuth: builder.query<void, void>({
            query: () => ({
                url: '/google'
            })
        })
        
    })
})

export const {
    useSigninMutation, 
    useSignupMutation,
    useGoogleAuthQuery
} = authAPI