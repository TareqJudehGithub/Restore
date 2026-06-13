import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../api/baseApi";

export const errorApi = createApi({
	reducerPath: "errorApi",
	baseQuery: baseQueryWithErrorHandling,
	//baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
	endpoints: (builder) => ({
		getValidationError: builder.query<void, void>({
			query: () => ({ url: "buggy/validation-error" }),
		}),
		get400Error: builder.query<void, void>({
			query: () => ({ url: "buggy/bad-request" }),
		}),
		get401Error: builder.query<void, void>({
			query: () => ({ url: "buggy/unauthorized" }),
		}),
		get404Error: builder.query<void, void>({
			query: () => ({ url: "buggy/not-found" }),
		}),
		get500Error: builder.query<void, void>({
			query: () => ({ url: "buggy/server-error" }),
		}),
	}),
});

export const {
	useLazyGetValidationErrorQuery,
	useLazyGet400ErrorQuery,
	useLazyGet401ErrorQuery,
	useLazyGet404ErrorQuery,
	useLazyGet500ErrorQuery,
} = errorApi;
