import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import type { CreateOrder, Order } from "../../models/order";

export const orderApi = createApi({
	reducerPath: "orderApi",
	baseQuery: baseQueryWithErrorHandling,
	//keepUnusedDataFor: 10,
	refetchOnFocus: true,
	refetchOnMountOrArgChange: true,
	tagTypes: ["Orders"],
	endpoints: (builder) => ({
		fetchOrder: builder.query<Order[], void>({
			query: () => ({
				url: "orders",
				providesTags: ["Orders"],
			}),
		}),
		fetchOrderDetails: builder.query<Order, number>({
			query: (id) => ({
				url: `orders/${id}`,
			}),
		}),
		createOrder: builder.mutation<Order, CreateOrder>({
			query: (order) => ({
				url: "orders",
				method: "POST",
				body: order,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(orderApi.util.invalidateTags(["Orders"]));
			},
		}),
	}),
});

export const {
	useFetchOrderQuery,
	useFetchOrderDetailsQuery,
	useCreateOrderMutation,
} = orderApi;
