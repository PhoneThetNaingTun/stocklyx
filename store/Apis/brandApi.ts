import { apiSlice } from "./apiSlice";

export const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: ({ page, limit, brand_name }) => {
        let queryString = "";
        if (brand_name) {
          queryString = `&brand_name=${brand_name}`;
        }
        return {
          url: `/brand/all?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Brand"],
    }),
    getAllArchivedBrands: builder.query({
      query: ({ page, limit, brand_name }) => {
        let queryString = "";
        if (brand_name) {
          queryString = `&brand_name=${brand_name}`;
        }
        return {
          url: `/brand/all/archived?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation({
      query: (payload) => ({
        url: "brand/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: (payload) => ({
        url: `brand/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
    archiveBrand: builder.mutation({
      query: (payload) => ({
        url: `brand/archive/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
    archiveManyBrand: builder.mutation({
      query: (payload) => ({
        url: `brand/archive-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
    restoreBrand: builder.mutation({
      query: (payload) => ({
        url: `brand/restore/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
    restoreManyBrand: builder.mutation({
      query: (payload) => ({
        url: `brand/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
      query: (payload) => ({
        url: `brand/delete/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteManyBrand: builder.mutation({
      query: (payload) => ({
        url: `brand/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetAllArchivedBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useArchiveBrandMutation,
  useArchiveManyBrandMutation,
  useRestoreBrandMutation,
  useRestoreManyBrandMutation,
  useDeleteBrandMutation,
  useDeleteManyBrandMutation,
} = brandApi;
