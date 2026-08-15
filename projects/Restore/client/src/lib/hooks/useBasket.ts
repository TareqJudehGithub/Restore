import {
	useClearBasketMutation,
	useFetchBasketQuery,
} from "../../app/features/basket/basketApi";
import type { Item } from "../../app/models/basket";

export const useBasket = () => {
	const { data: basket } = useFetchBasketQuery();
	const [clearBasket] = useClearBasketMutation();

	const subtotal = (basket?.items ?? []).reduce(
		(sum: number, item: Item) => sum + item.price * item.quantity,
		0,
	);

	const discount = basket?.coupon
		? basket.coupon.amountOff != null
			? basket.coupon.amountOff
			: subtotal * ((basket.coupon.percentOff ?? 0) / 100)
		: 0;

	const discountAmount = Number(discount.toFixed(2));
	const subTotalAfterDiscount = subtotal - discountAmount;
	const deliveryFee = subTotalAfterDiscount >= 100 ? 0 : 5;
	const total = (subTotalAfterDiscount + deliveryFee).toFixed(2);

	return {
		basket,
		subtotal,
		discount,
		discountAmount,
		subTotalAfterDiscount,
		deliveryFee,
		total,
		clearBasket,
	};
};
