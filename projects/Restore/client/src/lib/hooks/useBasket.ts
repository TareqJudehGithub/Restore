import { useFetchBasketQuery } from "../../app/features/basket/basketApi";
import type { Item } from "../../app/models/basket";

export const useBasket = () => {
	const { data: basket } = useFetchBasketQuery();
	let subtotal: number = 0;
	let discount: number = 0.1;
	let discountAmount: number = 0;
	let deliveryFee: number = 10;
	let subTotalAfterDiscount: number;

	((subtotal = (basket?.items ?? []).reduce(
		(sum: number, item: Item) => sum + item.price * item.quantity,
		0,
	)),
		0);

	if (discount > 0) {
		discountAmount = subtotal * discount;
		subTotalAfterDiscount = subtotal - discountAmount;
	} else {
		subTotalAfterDiscount = subtotal;
	}

	deliveryFee = subTotalAfterDiscount >= 100 ? 0 : 5;
	const total = subTotalAfterDiscount + deliveryFee;

	return {
		basket,
		subtotal,
		discountAmount,
		subTotalAfterDiscount,
		deliveryFee,
		total,
	};
};
