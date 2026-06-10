import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseQueryWithErrorHandling } from "../../api/baseApi";

import type { Product } from "../../models/product";

// Define a service using a base URL and expected endpoints
export const catalogApi = createApi({
	reducerPath: "catalogApi",
	// baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
	baseQuery: baseQueryWithErrorHandling,
	endpoints: (builder) => ({
		// GetProducts
		fetchProducts: builder.query<Product[], void>({
			// Define the baseQuery endpoints
			query: () => ({ url: "products" }),
		}),
		// GetProduct
		fetchProductDetails: builder.query<Product, number>({
			query: (productId) => ({ url: `products/${productId}` }),
		}),
	}),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useFetchProductDetailsQuery, useFetchProductsQuery } =
	catalogApi;
