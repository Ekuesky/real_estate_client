import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "/api/v1",
	credentials: "include",
});

export const baseApiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	endpoints: (builder) => ({}),
});