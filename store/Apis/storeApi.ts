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
    deleteStore: builder.mutation({
      query: (payload) => ({
        url: `store/delete/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Store"],
    }),
  }),
});

export const {
  useGetAllStoreQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
