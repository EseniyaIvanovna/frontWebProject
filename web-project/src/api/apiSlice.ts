/* eslint-disable no-empty-pattern */
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL ?? 'https://localhost:7187',
  prepareHeaders(headers) {
    const token = localStorage.getItem('auth_token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Post', 'Attachment'],
  endpoints: () => ({}),
});

export const {} = apiSlice;
