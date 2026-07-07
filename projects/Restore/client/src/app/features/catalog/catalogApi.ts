import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseQueryWithErrorHandling } from "../../api/baseApi";

import type { Product } from "../../models/product";
import type { ProductParams } from "../../models/productsParams";
import { filterEmptyValues } from "../../../util/util";
import type { Pagination } from "../../models/pagination";

// Define a service using a base URL and expected endpoints
export const catalogApi = createApi({
	reducerPath: "catalogApi",

	// baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
	baseQuery: baseQueryWithErrorHandling,
	//refetchOnFocus: true,
	endpoints: (builder) => ({
		// GetProducts
		fetchProducts: builder.query<
			{ items: Product[]; pagination: Pagination },
			ProductParams
		>({
			// Define the baseQuery endpoints
			query: (productsParams) => {
				return {
					url: "products",
					params: filterEmptyValues(productsParams),
				};
			},
			transformResponse: (items: Product[], meta) => {
				const paginationHeader = meta?.response?.headers.get("Pagination");
				const pagination = paginationHeader
					? JSON.parse(paginationHeader)
					: null;
				return { items, pagination };
			},
		}),
		// GetProduct
		fetchProductDetails: builder.query<Product, number>({
			query: (productId) => ({ url: `products/${productId}` }),
		}),
		// Filters
		fetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
			query: () => ({ url: "products/filters" }),
		}),
	}),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const {
	useFetchProductDetailsQuery,
	useFetchProductsQuery,
	useFetchFiltersQuery,
} = catalogApi;
