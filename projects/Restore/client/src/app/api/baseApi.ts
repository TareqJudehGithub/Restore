import {
	fetchBaseQuery,
	type BaseQueryApi,
	type FetchArgs,
} from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
	baseUrl: "https://localhost:5001/api",
	// responseHandler: "content-type",
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
		//const { status, data } = result.error;
		//console.log(data);

		// Check for parsing if needed
		const originalStatus =
			result.error.status === "PARSING_ERROR" && result.error.originalStatus
				? result.error.originalStatus
				: result.error.status;

		const responseData = result.error.data as ErrorResponse;
		console.log(result.error);

		switch (originalStatus) {
			case 400:
				if (typeof responseData === "string") toast.error(responseData);
				else if ("errors" in responseData) {
					// Throw the error(s) back to the component:
					throw Object.values(responseData.errors).flat().join(", ");
					toast.error("VALIDATION ERROR FOUND!");
				} else {
					toast.error(responseData.title);
				}
				break;
			case 401:
				if (typeof responseData === "string") toast.error(responseData);

				break;
			case 404:
				if (typeof responseData === "string") toast.error(responseData);
				break;
			case 500:
				if (typeof responseData === "object" && "title" in responseData)
					toast.error(responseData.title);
				break;
			default:
				break;
		}
	}
	return result;
};

type ErrorResponse = string | { title: string } | { errors: string[] };
