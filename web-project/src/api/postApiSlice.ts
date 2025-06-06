import { apiSlice } from './apiSlice';
import { Post } from './models/post';

export type GetPostsByUserRequest = {
  id: number;
};

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Получение постов пользователя по ID
    getPostsByUser: builder.query<Post[], GetPostsByUserRequest>({
      query: ({ id }) => ({
        url: `/Post/byUser/${id}`,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),

    createPost: builder.mutation<Post, Omit<Post, 'id' | 'createdAt'>>({
      query: (body) => ({
        url: '/Post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Post/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsByUserQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
