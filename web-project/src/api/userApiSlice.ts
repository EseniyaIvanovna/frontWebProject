/* eslint-disable @typescript-eslint/no-empty-object-type */
import { apiSlice } from './apiSlice';

export type UserInfoRequest = {};

export type UserInfoResponse = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  info: string;
  photoAttachmentUrl: string | null;
};

export type UpdateUserRequest = {
  name: string;
  lastName: string;
  dateOfBirth: string;
  info: string;
  password?: string;
  photoAttachmentUrl?: string | null;
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query<UserInfoResponse, UserInfoRequest>({
      query: () => ({
        url: '/User/userInfo',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<UserInfoResponse, UpdateUserRequest>({
      query: (body) => ({
        url: '/User',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useUserInfoQuery, useUpdateUserMutation } = userApiSlice;
