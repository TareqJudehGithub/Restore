import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";

import { catalogApi } from "../features/catalog/catalogApi";
import { basketApi } from "../features/basket/basketApi";
import { errorApi } from "../features/about/errorApi";
import { counterSlice } from "../features/contact/counterReducer";
import { uiSlice } from "../layout/uiSlice";
import { catalogSlice } from "../features/catalog/catalogSlice";
import { accountApi } from "../features/account/accountApi";

export const store = configureStore({
	// Define the reducers for the store, including the API reducer and any other slices
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[catalogApi.reducerPath]: catalogApi.reducer,
		[basketApi.reducerPath]: basketApi.reducer,
		[errorApi.reducerPath]: errorApi.reducer,
		[accountApi.reducerPath]: accountApi.reducer,

		counter: counterSlice.reducer,
		ui: uiSlice.reducer,
		catalog: catalogSlice.reducer,
	},
	// Add the API middleware to the store, which is necessary for handling asynchronous actions and caching
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			catalogApi.middleware,
			basketApi.middleware,
			errorApi.middleware,
			accountApi.middleware,
		),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// For ContactPage component - counter state
// Define types for the RootState and AppDispatch, which are used for type safety in the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

//#region Redux Store - Legacy
// export function configureTheStore() {
// 	return legacy_createStore(counterReducer);
// }
//#endregion
