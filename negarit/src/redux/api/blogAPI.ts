import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog, UpdateBlog, CreateBlog } from "../types/blog";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const blogAPI = createApi({
    reducerPath: 'blogAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}/blogs`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        getCurrentUserBlogs: builder.query<Blog, void>({
            query: () => ({
                url: '/current-Blog',
                method: 'Get'
            }),
            providesTags: ['Blog']
        }),

        findOneBlog: builder.query<Blog, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'Get'
            })
        }),

        findAllBlogs: builder.query<{doctors: Blog[], totalPages: number, currentPage: number}, {page: number, limit: number}>({
            query: ({ page = 1, limit = 10 }) => ({
                url: `?page=${page}&limit=${limit}`,
                method: 'Get'
            })
        }),

        updateBlog: builder.mutation<Blog, {id: string, update: UpdateBlog}>({
            query: ({id, update}) => ({
                url: `/${id}`,
                method: 'Put',
                body: update,
                
            }),
            invalidatesTags: ['Blog']
        }),
        createBlog: builder.mutation<Blog, CreateBlog>({
            query: (data) => ({
                url: `/`,
                method: 'Post',
                body: data,
                
            })
        }),

        searchBlogs: builder.query<Blog[], string>({
            query: (searchTerm) => ({
               url: `?search=${searchTerm}`,
               method: 'Get'
            })
        })

    })
})

export const {
    useCreateBlogMutation
    // useGetCurrentBlogQuery,
    // useFindOneBlogQuery,
    // useFindAllBlogsQuery,
    // useSearchBlogsQuery,
    // useUpdateBlogMutation,
    // useUpdateProfilePictureMutation


} = blogAPI