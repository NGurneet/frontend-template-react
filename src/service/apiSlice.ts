import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api', // Your backend base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Add Authorization header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    signup: builder.mutation<{ token: string }, { name: string; email: string; password: string; confirmPassword: string }>({
      query: (data) => ({
        url: '/users/',
        method: 'POST',
        body: {
          name: data.name,
          email: data.email,
          password: data.password,
        //   confirmPassword: data.confirmPassword,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = apiSlice;
