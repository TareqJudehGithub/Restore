import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import type { Address, User } from "../../models/User";
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
					dispatch(accountApi.util.resetApiState());
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
		fetchAddress: builder.query<Address, void>({
			query: () => ({
				url: "account/address",
			}),
		}),
		updateUserAddress: builder.mutation<Address, Address>({
			query: (address) => ({
				url: "account/address",
				method: "POST",
				body: address,
			}),
			// Update
			onQueryStarted: async (address, { dispatch, queryFulfilled }) => {
				dispatch(accountApi.util.resetApiState());
				const patchResult = dispatch(
					accountApi.util.updateQueryData(
						"fetchAddress",
						undefined,
						(draft) => {
							Object.assign(draft, { ...address });
						},
					),
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patchResult.undo();
					console.log(error);
				}
			},
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
	useFetchAddressQuery,
	useUpdateUserAddressMutation,
} = accountApi;
