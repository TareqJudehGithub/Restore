import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import { type Item, type Basket } from "../../models/basket";
import type { Product } from "../../models/product";
import Cookies from "js-cookie";

export const basketApi = createApi({
	reducerPath: "basketApi",
	baseQuery: baseQueryWithErrorHandling,
	tagTypes: ["Basket"],
	refetchOnFocus: true,
	endpoints: (builder) => ({
		// Fetch Basket
		fetchBasket: builder.query<Basket, void>({
			query: () => "basket",
			providesTags: ["Basket"],
		}),

		// Add Item(s) to Basket
		addBasketItem: builder.mutation<
			Basket,
			{ product: Product; quantity: number }
		>({
			query: ({ product, quantity }) => ({
				url: `basket?productId=${product.id}&quantity=${quantity}`,
				method: "POST",
			}),
			onQueryStarted: async (
				{ product, quantity },
				{ dispatch, queryFulfilled },
			) => {
				const patchResult = dispatch(
					basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
						if (!draft) return;
						const itemIndex = draft.items.findIndex(
							(item) => item.productId == product.id,
						);
						if (itemIndex >= 0) {
							draft.items[itemIndex].quantity += quantity;
						} else {
							draft.items.push({
								...product,
								productId: product.id,
								quantity,
							});
						}
					}),
				);
				try {
					await queryFulfilled;
				} catch (error) {
					console.log(error);
					patchResult.undo();
				}
			},
			invalidatesTags: ["Basket"],
		}),
		IncreaseBasketItemQty: builder.mutation<
			void,
			{ productId: number; quantity: number }
		>({
			query: ({ productId, quantity }) => ({
				url: `basket?productId=${productId}&quantity=${quantity}`,
				method: "PUT",
			}),
			onQueryStarted: async (
				{ productId, quantity },
				{ dispatch, queryFulfilled },
			) => {
				const patchResult = dispatch(
					basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
						if (!draft) return;
						const itemIndex = draft.items.findIndex(
							(item) => item.productId == productId,
						);
						if (itemIndex >= 0) {
							draft.items[itemIndex].quantity += quantity;
						}
					}),
				);
				try {
					await queryFulfilled;
				} catch (error) {
					console.log(error);
					patchResult.undo();
				}
			},
			invalidatesTags: ["Basket"],
		}),
		removeBasketItem: builder.mutation<
			void,
			{ productId: number; quantity: number }
		>({
			query: ({ productId, quantity }) => ({
				url: `basket?productId=${productId}&quantity=${quantity}`,
				method: "DELETE",
			}),
			onQueryStarted: async (
				{ productId, quantity },
				{ dispatch, queryFulfilled },
			) => {
				const patchResult = dispatch(
					basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
						if (!draft) return;
						// Check if the item is in the basket
						const itemIndex = draft.items.findIndex(
							(item) => item.productId == productId,
						);
						// In case item quantity is greater than 1, subtract item quantity by 1
						if (itemIndex >= 0) {
							draft.items[itemIndex].quantity -= quantity;
							// Safely removes the item from Basket in case it's quantity has reached zero
							if (draft.items[itemIndex].quantity <= 0) {
								draft.items.splice(itemIndex, 1);
							}
						}
					}),
				);
				try {
					await queryFulfilled;
				} catch (error) {
					console.log(error);
					patchResult.undo();
				}
			},
			invalidatesTags: ["Basket"],
		}),
		clearBasket: builder.mutation<void, void>({
			queryFn: () => ({
				data: undefined,
			}),
			onQueryStarted: async (_, { dispatch }) => {
				dispatch(
					basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
						draft.items = [];
					}),
				);
				// Clear buyerId cookie from the browser using package js-cookie
				Cookies.remove("basketId");
			},
		}),
	}),
});

export const {
	useFetchBasketQuery,
	useAddBasketItemMutation,
	useIncreaseBasketItemQtyMutation,
	useRemoveBasketItemMutation,
	useClearBasketMutation,
} = basketApi;
