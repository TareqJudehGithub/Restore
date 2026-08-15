import type { Product } from "./product";

export type Basket = {
	basketId: string;
	items: Item[];
	clientSecret?: string;
	paymentIntentId?: string;
	coupon: Coupon | null;
};

export type Item = {
	productId: number;
	name: string;
	price: number;
	pictureUrl: string;
	type: string;
	brand: string;
	quantity: number;
};

export type Coupon = {
	name: string;
	amountOff?: number;
	percentOff?: number;
	promotionCode: string;
	couponId: string;
};
