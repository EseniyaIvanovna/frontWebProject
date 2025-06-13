/* eslint-disable @typescript-eslint/no-empty-object-type */
import { apiSlice } from './apiSlice';

export type UserInfoRequest = {};
export type GetUserByIdRequest = {
  id: number;
};

export type UserInfoResponse = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  info: string;
  photoAttachmentUrl: string | null;
  photoAttachmentId: number | null;
};

export type UpdateUserRequest = {
  id: number;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  info: string;
  password?: string;
  photoAttachmentUrl?: string | null;
  photoAttachmentId?: number | null;
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query<UserInfoResponse, UserInfoRequest>({
      query: () => ({
        url: '/User/userInfo',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),

    getUserById: builder.query<UserInfoResponse, GetUserByIdRequest>({
      query: ({ id }) => ({
        url: `/User/${id}`,
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

export const { useUserInfoQuery, useGetUserByIdQuery, useUpdateUserMutation } =
  userApiSlice;
