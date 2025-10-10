import { apiSlice } from "./apiSlice";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: ({
        page,
        limit,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        customer_city,
        customer_country,
      }) => {
        let queryString = "";
        if (customer_name) {
          queryString += `&customer_name=${customer_name}`;
        }
        if (customer_email) {
          queryString += `&customer_email=${customer_email}`;
        }
        if (customer_phone) {
          queryString += `&customer_phone=${customer_phone}`;
        }
        if (customer_address) {
          queryString += `&customer_address=${customer_address}`;
        }
        if (customer_city) {
          queryString += `&customer_city=${customer_city}`;
        }
        if (customer_country) {
          queryString += `&customer_country=${customer_country}`;
        }
        return {
          url: `/customer/all?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Customer"],
    }),
    getAllArchivedCustomers: builder.query({
      query: ({
        page,
        limit,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        customer_city,
        customer_country,
      }) => {
        let queryString = "";
        if (customer_name) {
          queryString += `&customer_name=${customer_name}`;
        }
        if (customer_email) {
          queryString += `&customer_email=${customer_email}`;
        }
        if (customer_phone) {
          queryString += `&customer_phone=${customer_phone}`;
        }
        if (customer_address) {
          queryString += `&customer_address=${customer_address}`;
        }
        if (customer_city) {
          queryString += `&customer_city=${customer_city}`;
        }
        if (customer_country) {
          queryString += `&customer_country=${customer_country}`;
        }
        return {
          url: `/customer/all/archived?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Customer"],
    }),
    createCustomer: builder.mutation({
      query: (payload) => ({
        url: "customer/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: (payload) => ({
        url: `customer/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
    archiveCustomer: builder.mutation({
      query: (payload) => ({
        url: `customer/archive/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
    archiveManyCustomer: builder.mutation({
      query: (payload) => ({
        url: `customer/archive-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
    restoreCustomer: builder.mutation({
      query: (payload) => ({
        url: `customer/restore/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
    restoreManyCustomer: builder.mutation({
      query: (payload) => ({
        url: `customer/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (payload) => ({
        url: `customer/delete/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteManyCustomer: builder.mutation({
      query: (payload) => ({
        url: `customer/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetAllArchivedCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useArchiveCustomerMutation,
  useArchiveManyCustomerMutation,
  useRestoreCustomerMutation,
  useRestoreManyCustomerMutation,
  useDeleteCustomerMutation,
  useDeleteManyCustomerMutation,
} = customerApi;
