import { apiSlice } from './apiSlice';
import { Interaction } from './models/interaction';

export type AddInteractionRequest = {
  user1Id: number;
  user2Id: number;
  status: 1;
};

export type GetInteractionRequest = {
  id: number;
};

export const interactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addInteraction: builder.mutation<Interaction, AddInteractionRequest>({
      query: (body) => ({
        url: '/Interaction',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Interaction'],
    }),
    getInteractionByUserId: builder.query<Interaction[], GetInteractionRequest>(
      {
        query: ({ id }) => ({
          url: `/Interaction/ByUserId/${id}`,
          method: 'GET',
        }),
        providesTags: ['Interaction'],
      }
    ),
    removeInteraction: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Interaction/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Interaction'],
    }),
  }),
});

export const {
  useAddInteractionMutation,
  useGetInteractionByUserIdQuery,
  useRemoveInteractionMutation,
} = interactionApiSlice;
