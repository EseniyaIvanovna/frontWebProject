import { apiSlice } from './apiSlice';
import { Comment } from './models/comment';

export type GetCommentsByPostRequest = {
  postId: number;
};

export type AddCommentRequest = {
  postId: number;
  userId: number;
  content: string;
};

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPost: builder.query<Comment[], GetCommentsByPostRequest>({
      query: ({ postId }) => ({
        url: `/Comment/ByPost/${postId}`,
        method: 'GET',
      }),
      providesTags: ['Comment'],
    }),
    addComment: builder.mutation<Comment, AddCommentRequest>({
      query: (body) => ({
        url: '/Comment',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const { useGetCommentsByPostQuery, useAddCommentMutation } =
  commentApiSlice;
