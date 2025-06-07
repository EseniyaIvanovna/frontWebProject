import { apiSlice } from './apiSlice';
import { Comment } from './models/comment';

export type GetCommentsByPostRequest = {
  postId: number;
};

export type AddCommentRequest = {
  postId: number;
  content: string;
};

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByPost: builder.query<Comment[], GetCommentsByPostRequest>({
      query: ({ postId }) => ({
        url: `/Comment/ByPost/${postId}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
    addComment: builder.mutation<Comment, AddCommentRequest>({
      query: (body) => ({
        url: '/Comment',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Comment', id: arg.postId },
      ],
    }),
  }),
});

export const { useGetCommentsByPostQuery, useAddCommentMutation } =
  commentApiSlice;
