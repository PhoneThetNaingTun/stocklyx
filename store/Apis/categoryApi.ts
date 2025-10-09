import { apiSlice } from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({ page, limit, category_name }) => {
        let queryString = "";
        if (category_name) {
          queryString = `&category_name=${category_name}`;
        }
        return {
          url: `/category/all?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    getAllArchivedCategories: builder.query({
      query: ({ page, limit, category_name }) => {
        let queryString = "";
        if (category_name) {
          queryString = `&category_name=${category_name}`;
        }
        return {
          url: `/category/all/archived?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "category/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (payload) => ({
        url: `category/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    archiveCategory: builder.mutation({
      query: (payload) => ({
        url: `category/archive/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    archiveManyCategory: builder.mutation({
      query: (payload) => ({
        url: `category/archive-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    restoreCategory: builder.mutation({
      query: (payload) => ({
        url: `category/restore/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    restoreManyCategory: builder.mutation({
      query: (payload) => ({
        url: `category/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (payload) => ({
        url: `category/delete/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteManyCategory: builder.mutation({
      query: (payload) => ({
        url: `category/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useArchiveManyCategoryMutation,
  useArchiveCategoryMutation,
  useRestoreCategoryMutation,
  useRestoreManyCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteManyCategoryMutation,
  useGetAllArchivedCategoriesQuery,
} = categoryApi;
