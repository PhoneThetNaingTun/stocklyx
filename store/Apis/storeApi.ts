import { apiSlice } from "./apiSlice";

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStore: builder.query({
      query: ({ page, limit, store_name }) => ({
        url: `/store/all?page=${page}&limit=${limit}&store_name=${store_name}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    getAllArchiveStore: builder.query({
      query: ({ page, limit, store_name }) => ({
        url: `/store/all/archived?page=${page}&limit=${limit}&store_name=${store_name}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    createStore: builder.mutation({
      query: (payload) => ({
        url: "store/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Store"],
    }),
    updateStore: builder.mutation({
      query: (payload) => ({
        url: `store/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Store"],
    }),
    restoreStore: builder.mutation({
      query: (payload) => ({
        url: `store/${payload.id}/restore`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Store"],
    }),
    restoreManyStore: builder.mutation({
      query: (payload) => ({
        url: `store/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Store"],
    }),
    archiveStore: builder.mutation({
      query: (payload) => ({
        url: `store/${payload.id}/archive`,
        method: "DELETE",
      }),
      invalidatesTags: ["Store"],
    }),
    archiveManyStore: builder.mutation({
      query: (payload) => ({
        url: `store/archive-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Store"],
    }),
    deleteStore: builder.mutation({
      query: (payload) => ({
        url: `store/${payload.id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Store"],
    }),
    deleteManyStore: builder.mutation({
      query: (payload) => ({
        url: `store/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Store"],
    }),
  }),
});

export const {
  useGetAllStoreQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useArchiveStoreMutation,
  useGetAllArchiveStoreQuery,
  useArchiveManyStoreMutation,
  useDeleteStoreMutation,
  useDeleteManyStoreMutation,
  useRestoreManyStoreMutation,
  useRestoreStoreMutation,
} = storeApi;
