// This component filters error objects thrown from the API, and return an eye friendly
// error message to the user.
export const getErrorMessage = (error: unknown): string => {
	if (typeof error === "string") return error;

	if (error && typeof error === "object") {
		const maybeData = (error as { data?: unknown }).data;

		if (typeof maybeData === "string") return maybeData;

		if (maybeData && typeof maybeData === "object") {
			if (
				"message" in maybeData &&
				typeof (maybeData as { message?: unknown }).message === "string"
			) {
				return (maybeData as { message: string }).message;
			}

			if (
				"error" in maybeData &&
				typeof (maybeData as { error?: unknown }).error === "string"
			) {
				return (maybeData as { error: string }).error;
			}

			if (
				"errors" in maybeData &&
				maybeData.errors &&
				typeof maybeData.errors === "object"
			) {
				const messages = Object.values(
					maybeData.errors as Record<string, unknown>,
				)
					.flat()
					.filter((value): value is string => typeof value === "string");

				if (messages.length) return messages.join(", ");
			}
		}

		if (
			"message" in error &&
			typeof (error as { message?: unknown }).message === "string"
		) {
			return (error as { message: string }).message;
		}

		if (
			"error" in error &&
			typeof (error as { error?: unknown }).error === "string"
		) {
			return (error as { error: string }).error;
		}
	}

	return "Something went wrong.";
};
