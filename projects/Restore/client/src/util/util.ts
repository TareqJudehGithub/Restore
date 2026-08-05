import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ShippingAddress, PaymentSummary } from "../app/models/order";

export function filterEmptyValues(values: object) {
	return Object.fromEntries(
		Object.entries(values).filter(
			([, value]) =>
				value !== "" &&
				value !== null &&
				value !== undefined &&
				value.length != 0,
		),
	);
}

export const formatAddressString = (address: ShippingAddress) => {
	if (address?.line2 === null) {
		return `${address?.name}, ${address?.line1}, ${address?.city}, 
			${address?.state}, ${address?.postal_code}, ${address?.country}`;
	} else {
		return `${address?.name}, ${address?.line1}, ${address?.line2}, ${address?.city}, 
			${address?.state}, ${address?.postal_code}, ${address?.country}`;
	}
};

export const formatPaymentString = (card: PaymentSummary) => {
	return `${card?.brand.toUpperCase()}, **** **** **** ${card?.last4}, 
	Exp: ${card?.exp_month}/${card?.exp_year}`;
};

export function handleApiError<T extends FieldValues>(
	error: unknown,
	setError: UseFormSetError<T>,
	fieldNames: Path<T>[],
) {
	const apiError = (error as { message: string }) || {};
	if (apiError.message && typeof apiError.message === "string") {
		const errorArray = apiError.message.split(",");

		errorArray.forEach((err) => {
			const matchedField = fieldNames.find((fieldName) =>
				err.toLowerCase().includes(fieldName.toString().toLowerCase()),
			);
			if (matchedField) {
				setError(matchedField, { message: err.trim() });
			}
		});
	}
}
export const servicesId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
export const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_ID;
export const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
export const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLAY;
export const confirmOrderTemplateId = import.meta.env
	.VITE_EMAILJS_CONFIRM_ORDER_TEMPLATE_ID;
