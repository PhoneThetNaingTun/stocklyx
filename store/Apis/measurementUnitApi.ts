import { apiSlice } from "./apiSlice";

export const measurementUnitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMeasurementUnits: builder.query({
      query: ({ page, limit, name, unit }) => {
        let queryString = "";
        if (name) {
          queryString = `&name=${name}`;
        }
        if (unit) {
          queryString = `&unit=${unit}`;
        }
        return {
          url: `/measurement-unit/all?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["MeasurementUnit"],
    }),
    getAllArchivedMeasurementUnit: builder.query({
      query: ({ page, limit, name, unit }) => {
        let queryString = "";
        if (name) {
          queryString = `&name=${name}`;
        }
        if (unit) {
          queryString = `&unit=${unit}`;
        }
        return {
          url: `/measurement-unit/all/archived?page=${page}&limit=${limit}${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["MeasurementUnit"],
    }),
    createMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: "measurement-unit/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
    updateMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: `measurement-unit/update/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
    archiveMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: `measurement-unit/archive/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
    archiveManyMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: `measurement-unit/archive-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
    restoreMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: `measurement-unit/restore/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
    restoreManyMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: `measurement-unit/restore-multiple`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
    deleteMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: `measurement-unit/delete/${payload.id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
    deleteManyMeasurementUnit: builder.mutation({
      query: (payload) => ({
        url: `measurement-unit/delete-multiple`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["MeasurementUnit"],
    }),
  }),
});

export const {
  useGetAllMeasurementUnitsQuery,
  useGetAllArchivedMeasurementUnitQuery,
  useCreateMeasurementUnitMutation,
  useUpdateMeasurementUnitMutation,
  useArchiveManyMeasurementUnitMutation,
  useArchiveMeasurementUnitMutation,
  useRestoreMeasurementUnitMutation,
  useRestoreManyMeasurementUnitMutation,
  useDeleteMeasurementUnitMutation,
  useDeleteManyMeasurementUnitMutation,
} = measurementUnitApi;
