import { apiSlice } from "./apiSlice";

const productVariantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductVariantsByProductId: builder.query({
      query: ({ page, limit, productId }) => {
        let queryString = "";

        return {
          url: `/product-variant/all/${productId}?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["ProductVariant"],
    }),
    getAllArchiveProductVariants: builder.query({
      query: ({ page, limit, product_name }) => {
        let queryString = "";
        product_name && (queryString += `&product_name=${product_name}`);

        return {
          url: `/product-variant/archived?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["ProductVariant"],
    }),
    createMultipleProductVariants: builder.mutation({
      query: ({ productId, ...payload }) => ({
        url: `/product-variant/create-multiple/${productId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    updateProductVariant: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/product-variant/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    archiveProductVariant: builder.mutation({
      query: (payload) => ({
        url: `/product-variant/archive/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    archiveManyProductVariant: builder.mutation({
      query: (payload) => ({
        url: `/product-variant/archive-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    restoreProductVariant: builder.mutation({
      query: (payload) => ({
        url: `/product-variant/restore/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    restoreManyProductVariant: builder.mutation({
      query: (payload) => ({
        url: `/product-variant/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    deleteProductVariant: builder.mutation({
      query: (payload) => ({
        url: `/product-variant/delete/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
    deleteManyProductVariant: builder.mutation({
      query: (payload) => ({
        url: `/product-variant/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["ProductVariant"],
    }),
  }),
});

export const {
  useGetAllProductVariantsByProductIdQuery,
  useGetAllArchiveProductVariantsQuery,
  useCreateMultipleProductVariantsMutation,
  useUpdateProductVariantMutation,
  useArchiveProductVariantMutation,
  useArchiveManyProductVariantMutation,
  useRestoreProductVariantMutation,
  useRestoreManyProductVariantMutation,
  useDeleteProductVariantMutation,
  useDeleteManyProductVariantMutation,
} = productVariantApi;
