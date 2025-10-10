import { apiSlice } from "./apiSlice";

export const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuppliers: builder.query({
      query: ({
        page,
        limit,
        supplier_name,
        supplier_email,
        supplier_phone,
        supplier_address,
        supplier_city,
        supplier_country,
      }) => {
        let queryString = "";
        if (supplier_name) {
          queryString += `&supplier_name=${supplier_name}`;
        }
        if (supplier_email) {
          queryString += `&supplier_email=${supplier_email}`;
        }
        if (supplier_phone) {
          queryString += `&supplier_phone=${supplier_phone}`;
        }
        if (supplier_address) {
          queryString += `&supplier_address=${supplier_address}`;
        }
        if (supplier_city) {
          queryString += `&supplier_city=${supplier_city}`;
        }
        if (supplier_country) {
          queryString += `&supplier_country=${supplier_country}`;
        }
        return {
          url: `/supplier/all?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Supplier"],
    }),
    getAllArchivedSupplier: builder.query({
      query: ({
        page,
        limit,
        supplier_name,
        supplier_email,
        supplier_phone,
        supplier_address,
        supplier_city,
        supplier_country,
      }) => {
        let queryString = "";
        if (supplier_name) {
          queryString += `&supplier_name=${supplier_name}`;
        }
        if (supplier_email) {
          queryString += `&supplier_email=${supplier_email}`;
        }
        if (supplier_phone) {
          queryString += `&supplier_phone=${supplier_phone}`;
        }
        if (supplier_address) {
          queryString += `&supplier_address=${supplier_address}`;
        }
        if (supplier_city) {
          queryString += `&supplier_city=${supplier_city}`;
        }
        if (supplier_country) {
          queryString += `&supplier_country=${supplier_country}`;
        }
        return {
          url: `/supplier/all/archived?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Supplier"],
    }),
    createSupplier: builder.mutation({
      query: (payload) => ({
        url: "supplier/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
    updateSupplier: builder.mutation({
      query: (payload) => ({
        url: `supplier/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
    archiveSupplier: builder.mutation({
      query: (payload) => ({
        url: `supplier/archive/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
    archiveManySupplier: builder.mutation({
      query: (payload) => ({
        url: `supplier/archive-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
    restoreSupplier: builder.mutation({
      query: (payload) => ({
        url: `supplier/restore/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
    restoreManySupplier: builder.mutation({
      query: (payload) => ({
        url: `supplier/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
    deleteSupplier: builder.mutation({
      query: (payload) => ({
        url: `supplier/delete/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
    deleteManySupplier: builder.mutation({
      query: (payload) => ({
        url: `supplier/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useGetAllArchivedSupplierQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useArchiveSupplierMutation,
  useArchiveManySupplierMutation,
  useRestoreSupplierMutation,
  useRestoreManySupplierMutation,
  useDeleteSupplierMutation,
  useDeleteManySupplierMutation,
} = supplierApi;
