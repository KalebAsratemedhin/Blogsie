import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserUpdate } from "../types/user";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}/users`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: '/current-user',
                method: 'Get'
            }),
            providesTags: ['User']
        }),

        findOneUser: builder.query<User, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            })
        }),

        findAllUsers: builder.query<{doctors: User[], totalPages: number, currentPage: number}, {page: number, limit: number}>({
            query: ({ page = 1, limit = 10 }) => ({
                url: `?page=${page}&limit=${limit}`,
                method: 'Get'
            })
        }),

        updateUser: builder.mutation<User, {id: string, update: UserUpdate}>({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            }),
            invalidatesTags: ['User']
        }),

        updateProfilePicture: builder.mutation<User, {id: string, update: any}>({
            query: ({id, update}) => ({
                url: `/profile-pic/${id}`,
                method: 'Put',
                body: update,
                
            }),
            invalidatesTags: ['User']

        }),

        searchUsers: builder.query<User[], string>({
            query: (searchTerm) => ({
               url: `?search=${searchTerm}`,
               method: 'Get'
            })
        })

    })
})

export const {
    useGetCurrentUserQuery,
    useFindOneUserQuery,
    useFindAllUsersQuery,
    useSearchUsersQuery,
    useUpdateUserMutation,
    useUpdateProfilePictureMutation


} = userAPI