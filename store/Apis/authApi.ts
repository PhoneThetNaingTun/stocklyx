import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "POST",
      }),
    }),
    getMe: builder.query({ query: () => ({ url: "user/me", method: "GET" }) }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLazyGetMeQuery } =
  authApi;
