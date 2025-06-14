import { apiSlice } from './apiSlice';

export interface Attachment {
  id: number;
  fileName: string;
  storedPath: string;
  contentType: string;
  size: number;
  category: string;
}

export interface UploadAttachmentResponse {
  id: number;
  fileName: string;
  storedPath: string;
}

export const attachmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadAttachment: builder.mutation<
      UploadAttachmentResponse,
      { file: File; category?: string }
    >({
      query: ({ file, category = 'attachments' }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/api/Attachments',
          method: 'POST',
          body: formData,
          params: { category },
        };
      },
      invalidatesTags: ['Attachment'],
    }),

    getAttachmentMetadata: builder.query<Attachment, number>({
      query: (id) => `/api/Attachments/${id}/meta`,
      providesTags: (result, error, id) => [{ type: 'Attachment', id }],
    }),

    getAttachmentLink: builder.query<{ url: string }, number>({
      query: (id) => `/api/Attachments/${id}/link`,
      providesTags: (result, error, id) => [{ type: 'Attachment', id }],
    }),

    deleteAttachment: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/Attachments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Attachment'],
    }),
  }),
});

export const {
  useUploadAttachmentMutation,
  useGetAttachmentMetadataQuery,
  useGetAttachmentLinkQuery,
  useLazyGetAttachmentLinkQuery,
  useDeleteAttachmentMutation,
} = attachmentsApiSlice;
