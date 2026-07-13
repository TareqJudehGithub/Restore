import type { Product } from "./product";

export type Basket = {
	basketId: string;
	items: Item[];
	clientSecret?: string;
	paymentIntentId?: string;
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
