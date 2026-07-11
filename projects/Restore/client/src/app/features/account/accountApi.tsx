import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import type { User } from "../../models/User";
import type { loginSchema } from "../../../lib/Schemas/LoginSchema";
import { router } from "../../routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
	reducerPath: "accountApi",
	baseQuery: baseQueryWithErrorHandling,
	tagTypes: ["UserInfo"],
	endpoints: (builder) => ({
		register: builder.mutation<void, object>({
			query: (credentials) => {
				return {
					url: "account/register",
					method: "POST",
					body: credentials,
				};
			},
			async onQueryStarted(_, { queryFulfilled }) {
				try {
					await queryFulfilled;
					toast.success("Registration was successful!");
					router.navigate("/login");
				} catch (error) {
					//	toast.error(getErrorMessage(error));
					console.error(error);
				}
			},
		}),
		login: builder.mutation<void, loginSchema>({
			query: (credentials) => {
				return {
					url: "login?useCookies=true",
					method: "POST",
					body: credentials,
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(accountApi.util.invalidateTags(["UserInfo"]));
				} catch (error) {
					console.log(error);
				}
			},
		}),
		userInfo: builder.query<User, void>({
			query: () => ({ url: "account/user-info" }),
			providesTags: ["UserInfo"],
		}),
		logout: builder.mutation({
			query: () => {
				return {
					url: "account/logout",
					method: "POST",
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await queryFulfilled;
				dispatch(accountApi.util.invalidateTags(["UserInfo"]));
				router.navigate("/");
			},
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useUserInfoQuery,
	useLazyUserInfoQuery,
	useLogoutMutation,
} = accountApi;
