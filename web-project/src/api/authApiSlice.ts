/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { apiSlice } from './apiSlice';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegistrattionRequest = {
  Name: string;
  LastName: string;
  DateOfBirth: Date | null;
  Email: string;
  Password: string;
};

export type RegisterResponse = {};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (args) => ({
        url: '/Auth/login',
        method: 'POST',
        body: args,
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem('auth_token', data.token);
          }
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<RegisterResponse, RegistrattionRequest>({
      query: (args) => ({
        url: '/Auth/register',
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<any, any>({
      query: () => ({
        url: '/Auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;
