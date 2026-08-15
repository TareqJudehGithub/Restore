import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../api/baseApi";
import { type Item, type Basket } from "../../models/basket";
import type { Product } from "../../models/product";
import Cookies from "js-cookie";

// Type Guard to check if the product is of type Item
function isBasketItem(product: Product | Item): product is Item {
	return (product as Item).quantity !== undefined;
}

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
		// Increase Item Quantity in Basket
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
		// Remove Item(s) from Basket
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
		// Clear Basket
		clearBasket: builder.mutation<void, void>({
			queryFn: () => ({
				data: undefined,
			}),
			onQueryStarted: async (_, { dispatch }) => {
				dispatch(
					basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
						// Clear items from Basket
						draft.items = [];
						draft.basketId = "";
					}),
				);
				// Clear buyerId cookie from the browser using package js-cookie
				Cookies.remove("basketId");
			},
		}),
		// Apply Coupon
		addCoupon: builder.mutation<Basket, string>({
			query: (code: string) => ({
				url: `basket/${code}`,
				method: "POST",
			}),
			onQueryStarted: async (code, { dispatch, queryFulfilled }) => {
				const patchResult = dispatch(
					basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
						if (!draft) return;
					}),
				);
				try {
					const { data: updatedBasket } = await queryFulfilled;
					dispatch(
						basketApi.util.updateQueryData(
							"fetchBasket",
							undefined,
							(draft) => {
								if (!draft) return;
								Object.assign(draft, updatedBasket);
							},
						),
					);
				} catch (error) {
					console.log(error);
					patchResult.undo();
				}
			},
		}),
		// Remove Coupon
		removeCoupon: builder.mutation<Basket, void>({
			query: () => ({
				url: "basket/remove-coupon",
				method: "DELETE",
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const patchResult = dispatch(
					basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
						if (!draft) return;
						draft.coupon = null;
					}),
				);
				try {
					await queryFulfilled;
				} catch (error) {
					console.log(error);
					patchResult.undo();
				}
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
	useAddCouponMutation,
	useRemoveCouponMutation,
} = basketApi;
