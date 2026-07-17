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
