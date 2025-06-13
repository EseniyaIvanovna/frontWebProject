/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL ?? 'https://localhost:7187',
  credentials: 'include',
  // prepareHeaders(headers) {
  //   const token = localStorage.getItem('auth_token');

  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  // },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    'User',
    'Post',
    'Attachment',
    'Reaction',
    'Comment',
    'Interaction',
  ],
  endpoints: (build) => ({}),
});

export const {} = apiSlice;
