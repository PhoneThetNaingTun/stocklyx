import { apiSlice } from "./apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page, limit, product_name, brandId, categoryId }) => {
        let queryString = "";
        if (product_name) {
          queryString += `&product_name=${product_name}`;
        }
        if (brandId) {
          queryString += `&brandId=${brandId}`;
        }

        if (categoryId) {
          queryString += `&categoryId=${categoryId}`;
        }

        return {
          url: `/product/all?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getAllArchivedProducts: builder.query({
      query: ({ page, limit, product_name, brandId, categoryId }) => {
        let queryString = "";
        if (product_name) {
          queryString += `&product_name=${product_name}`;
        }
        if (brandId) {
          queryString += `&brandId=${brandId}`;
        }

        if (categoryId) {
          queryString += `&categoryId=${categoryId}`;
        }
        return {
          url: `/product/all/archived?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getOneProduct: builder.query({
      query: (id) => ({
        url: `product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "product/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: `product/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    archiveProduct: builder.mutation({
      query: (payload) => ({
        url: `product/archive/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    archiveManyProduct: builder.mutation({
      query: (payload) => ({
        url: `product/archive-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    restoreProduct: builder.mutation({
      query: (payload) => ({
        url: `product/restore/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    restoreManyProduct: builder.mutation({
      query: (payload) => ({
        url: `product/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (payload) => ({
        url: `product/delete/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteManyProduct: builder.mutation({
      query: (payload) => ({
        url: `product/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAllArchivedProductsQuery,
  useGetOneProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useArchiveManyProductMutation,
  useArchiveProductMutation,
  useRestoreProductMutation,
  useRestoreManyProductMutation,
  useDeleteManyProductMutation,
  useDeleteProductMutation,
} = productApi;
