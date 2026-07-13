import {
	Box,
	Paper,
	Typography,
	Divider,
	Button,
	TextField,
} from "@mui/material";

import { useFetchBasketQuery } from "../../features/basket/basketApi";
import type { Item } from "../../models/basket";
import { NavLink, useLocation } from "react-router";

export default function OrderSummary() {
	const location = useLocation();
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

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				maxWidth: "lg",
				mx: "auto",
			}}
		>
			<Paper sx={{ mb: 2, p: 3, width: "100%", borderRadius: 3 }}>
				<Typography variant="h6" component="p" sx={{ fontWeight: "bold" }}>
					Order summary
				</Typography>
				<Typography variant="body2" sx={{ fontStyle: "italic" }}>
					Orders over $100 qualify for free delivery!
				</Typography>
				<Box sx={{ mt: 2 }}>
					<Box
						sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
					>
						<Typography color="textSecondary">Subtotal</Typography>
						<Typography>${subtotal.toFixed(2)}</Typography>
					</Box>
					<Box
						sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
					>
						<Typography color="textSecondary">Discount</Typography>
						<Typography color="success">
							${discountAmount.toFixed(2)}
						</Typography>
					</Box>
					<Box
						sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
					>
						<Typography color="textSecondary">Delivery fee</Typography>
						<Typography> ${deliveryFee}</Typography>
					</Box>
					<Divider sx={{ my: 2 }} />
					<Box
						sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
					>
						<Typography color="textSecondary">Total</Typography>
						<Typography>${total.toFixed(2)}</Typography>
					</Box>
				</Box>

				<Box sx={{ mt: 2 }}>
					{!location.pathname.includes("checkout") && (
						<Button
							variant="contained"
							color="primary"
							fullWidth
							sx={{ mb: 1 }}
							component={NavLink}
							to={"/checkout"}
						>
							Checkout
						</Button>
					)}
					<Button component={NavLink} to={"/catalog"} fullWidth>
						Continue Shopping
					</Button>
				</Box>
			</Paper>

			{/* Coupon Code Section */}
			<Paper sx={{ width: "100%", borderRadius: 3, p: 3 }}>
				<form>
					<Typography variant="subtitle1" component="label">
						Do you have a voucher code?
					</Typography>

					<TextField
						label="Voucher code"
						variant="outlined"
						fullWidth
						sx={{ my: 2 }}
					/>

					<Button type="submit" variant="contained" color="primary" fullWidth>
						Apply code
					</Button>
				</form>
			</Paper>
		</Box>
	);
}
