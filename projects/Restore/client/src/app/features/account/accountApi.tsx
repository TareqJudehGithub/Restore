import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import type { User } from "../../models/User";
import type { loginSchema } from "../../../lib/Schemas/LoginSchema";

export const accountApi = createApi({
	reducerPath: "accountApi",
	baseQuery: baseQueryWithErrorHandling,
	endpoints: (builder) => ({
		login: builder.mutation<void, loginSchema>({
			query: (credentials) => {
				return {
					url: "login?useCookies=true",
					method: "POST",
					body: credentials,
				};
			},
		}),
		register: builder.mutation<void, object>({
			query: (credentials) => {
				return {
					url: "account/register",
					method: "POST",
					body: credentials,
				};
			},
		}),
		userInfo: builder.query<User, void>({
			query: () => ({ url: "account/user-info" }),
		}),
		logout: builder.mutation({
			query: () => {
				return {
					url: "account/logout",
					method: "POST",
				};
			},
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useUserInfoQuery,
	useLogoutMutation,
} = accountApi;
