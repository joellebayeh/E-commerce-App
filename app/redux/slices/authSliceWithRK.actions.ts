// // services/apiSlice.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {API} from "@/app/screens/endpoints";
//
// export const authSlice = createApi({
//     reducerPath: 'auth', // Unique key for the API slice
//     baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL}), // API base URL
//     endpoints: (builder) => ({
//         // Mutation for POST request
//         loginUser: builder.mutation({
//             query: (credentials: { email: string; password: string }) => ({
//                 url: API.USER.LOGIN, // Endpoint for the POST request
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: credentials, // Payload to send in the POST request
//             }),
//         }),
//     }),
// });
//
// export const { useLoginUser } = authSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authSlice = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: API.BASE_URL }),
    endpoints: builder => ({
        loginUser: builder.mutation<{ email: string; password: string }>({
            query: ({email, password}) => ({
                url: API.USER.LOGIN,
                method: 'POST',
                body: {email: email, password: password}
            })
        })
    })
})

export const {useLoginUserMutation} = authSlice