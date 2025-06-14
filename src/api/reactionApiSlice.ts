import { apiSlice } from './apiSlice';
import { Reaction } from './models/reaction';

export type GetReactionsByPostRequest = {
  postId: number;
};

export type AddReactionRequest = {
  postId: number;
  userId: number;
  type: 1;
};

export type RemoveReactionRequest = {
  id: number;
};

export const reactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReactionsByPost: builder.query<Reaction[], GetReactionsByPostRequest>({
      query: ({ postId }) => ({
        url: `/Reaction/ByPost/${postId}`,
        method: 'GET',
      }),
      providesTags: ['Reaction'],
    }),

    addReaction: builder.mutation<Reaction, AddReactionRequest>({
      query: (body) => ({
        url: '/Reaction',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Reaction'],
    }),

    removeReaction: builder.mutation<void, RemoveReactionRequest>({
      query: ({ id }) => ({
        url: `/Reaction/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reaction'],
    }),
  }),
});

export const {
  useGetReactionsByPostQuery,
  useLazyGetReactionsByPostQuery,
  useAddReactionMutation,
  useRemoveReactionMutation,
} = reactionApiSlice;
