import {
	fetchBaseQuery,
	type BaseQueryApi,
	type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
	baseUrl: "https://localhost:5001/api",
});

// Sleep function
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: object,
) => {
	// Start loading
	api.dispatch(startLoading());
	await sleep();

	const result = await customBaseQuery(args, api, extraOptions);

	// Stop loading
	api.dispatch(stopLoading());

	if (result.error) {
		const { status, data } = result.error;
		console.log({ status, data });
	}
	return result;
};
