import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "/api/v1",
	credentials: "include" /* Inclut les cookies dans les requêtes */
});

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	endpoints: (builder) => ({}),
});