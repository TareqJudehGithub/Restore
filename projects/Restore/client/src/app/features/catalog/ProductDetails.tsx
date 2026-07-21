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
	Box,
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

	const updateQuantity = (item: Item | undefined): number =>
		item ? Math.abs(quantity - item.quantity) : quantity;

	const handleUpdateBasket = () => {
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
		<Grid container spacing={{ xs: 3, md: 6 }} sx={{ mx: "auto" }}>
			<Grid size={{ xs: 12, md: 6 }}>
				<Box
					component="img"
					src={product.pictureUrl}
					alt={product.name}
					sx={{
						width: "100%",
						maxWidth: "100%",
						height: "100%",
						overflow: "hidden",
						borderRadius: 8,
						backgroundColor: "#f5f5f5",
						objectFit: "contain", // Ensures it doesn't stretch or distort
						objectPosition: "center",
						display: "block",
					}}
				></Box>
			</Grid>
			<Grid size={{ xs: 12, md: 6 }}>
				<Typography
					variant="h3"
					sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
				>
					{product.name}
				</Typography>
				<Divider sx={{ mb: 2 }} />
				<Typography
					variant="h4"
					sx={{ fontSize: { xs: "1.25rem", md: "2.125rem" } }}
				>
					{product.price.toFixed(2)}
				</Typography>

				<TableContainer>
					<Table sx={{ "& td": { fontSize: { xs: "0.95rem", md: "1rem" } } }}>
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
				<Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ marginTop: 3 }}>
					<Grid size={{ xs: 12, sm: 6 }}>
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
					<Grid size={{ xs: 12, sm: 6 }}>
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
