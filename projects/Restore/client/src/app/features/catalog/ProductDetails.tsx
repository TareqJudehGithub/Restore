import React, { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router";
import { useFetchProductDetailsQuery } from "./catalogApi";
import Grid from "@mui/material/Grid";
import {
	useAddBasketItemMutation,
	useFetchBasketQuery,
	useIncreaseBasketItemQtyMutation,
	useRemoveBasketItemMutation,
} from "../basket/basketApi";

import {
	Button,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import type { Item } from "../../models/basket";

export default function ProductDetails() {
	const { data: basket } = useFetchBasketQuery();
	const [addBasketItem] = useAddBasketItemMutation();
	const [increaseBasketItemQty] = useIncreaseBasketItemQtyMutation();
	const [removeBasketItem] = useRemoveBasketItemMutation();

	const params = useParams();
	const item = basket?.items?.find(
		(item) => item.productId === Number(params.id),
	);
	//#region States
	const [quantity, setQuantity] = useState<number>(1);
	useEffect(() => {
		// Set the item quantity to (quantity state)
		if (item) setQuantity(item.quantity);
	}, [item]);
	//#endregion

	const { data: product, isLoading } = useFetchProductDetailsQuery(
		Number(params.id) || 0,
	);

	if (!product || isLoading) return <div>Loading...</div>;
	//#region Helper functions for updating item quantity

	const updateQuantity = (item: Item | undefined): number =>
		item ? Math.abs(quantity - item.quantity) : quantity;

	const handleUpdateBasket = () => {
		// const updateQuantity = item
		// 	? Math.abs(quantity - item.quantity)
		// 	: quantity;

		// In case we don't have (the) item in the basket/cart
		if (!item) {
			addBasketItem({ product, quantity: updateQuantity(item) });
		}
		if (item != null) {
			if (quantity > item.quantity) {
				increaseBasketItemQty({
					productId: product.id,
					quantity: updateQuantity(item),
				});
			}
			if (quantity < item.quantity) {
				removeBasketItem({
					productId: product.id,
					quantity: updateQuantity(item),
				});
			}
		}
	};
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const value = Number(event.currentTarget.value);
		if (value >= 0) setQuantity(value);
	};
	//#endregion

	const productDetails: ProductProperties[] = [
		{ label: "Brand", value: product.brand },
		// { label: "Name", value: product.name },
		{ label: "Type", value: product.type },
		{ label: "Description", value: product.description },
		{ label: "quantity In Stock", value: product.quantityInStock },
	];

	return (
		<Grid container spacing={6} sx={{ mx: "auto" }}>
			<Grid size={6}>
				<img
					src={product.pictureUrl}
					alt={product.name}
					style={{ width: "100%" }}
				/>
			</Grid>
			<Grid size={6}>
				<Typography variant="h3">{product.name}</Typography>
				<Divider sx={{ mb: 2 }} />
				<Typography variant="h4">{product.price.toFixed(2)}</Typography>

				<TableContainer>
					<Table
						// Increase cell font size
						sx={{ "& td": { fontSize: "1rem" } }}
					>
						<TableBody>
							{productDetails.map((product, index) => (
								<TableRow key={index}>
									<TableCell align="left" sx={{ fontWeight: "bold" }}>
										{product.label}
									</TableCell>
									<TableCell align="left">{product.value}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Grid container spacing={2} sx={{ marginTop: 3 }}>
					<Grid size={6}>
						<TextField
							size="small"
							variant="outlined"
							type="number"
							label="Quantity in basket"
							fullWidth
							value={quantity}
							onChange={handleInputChange}
						/>
					</Grid>
					<Grid size={6}>
						<Button
							onClick={handleUpdateBasket}
							disabled={
								quantity === item?.quantity || (!item && quantity === 0)
							}
							color="primary"
							size="large"
							variant="contained"
							fullWidth
						>
							{item ? <span>Update Quantity</span> : <span>Add to Cart</span>}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

type ProductProperties = {
	label: string;
	value: string | number;
};

//#region useEffect - getProduct by id
// const [product, setProduct] = useState<Product | null>(null);

// // Fetch item
// useEffect(() => {
// 	const url = `https://localhost:5001/api/products/${id}`;

// 	const fetchData = async () => {
// 		try {
// 			const response = await fetch(url);
// 			const data = await response.json();
// 			setProduct(data);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};
// 	fetchData();
// }, [id]);
//#endregion
