import {
	Box,
	Paper,
	Typography,
	Divider,
	Button,
	TextField,
} from "@mui/material";

import { NavLink, useLocation } from "react-router";
import { useBasket } from "../../../lib/hooks/useBasket";

export default function OrderSummary() {
	const location = useLocation();

	const { subtotal, deliveryFee, total, discountAmount } = useBasket();

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
			<Paper
				sx={{
					mb: 2,
					px: { xs: 1, sm: 1, md: 2, lg: 3 },
					py: { xs: 1, sm: 1, md: 3 },
					width: "100%",
					borderRadius: 3,
				}}
			>
				<Typography
					component="p"
					sx={{
						fontWeight: "bold",
						fontSize: { xs: 15, sm: 18, md: 20, lg: 22 },
						p: { xs: 1 },
					}}
				>
					Order summary
				</Typography>
				<Typography
					variant="body2"
					sx={{
						fontStyle: "italic",
						fontSize: { xs: 12, sm: 14 },
						px: { xs: 1 },
					}}
				>
					Orders over $100 qualify for free delivery!
				</Typography>
				<Box
					sx={{
						mt: 2,
						px: { xs: 1 },
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography
							color="textSecondary"
							sx={{
								fontSize: { xs: 15, sm: 16 },
							}}
						>
							Subtotal
						</Typography>
						<Typography
							sx={{
								fontSize: { xs: 12, sm: 16 },
							}}
						>
							&#36;{subtotal.toFixed(2)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography
							sx={{
								fontSize: { xs: 15, sm: 16 },
							}}
							color="textSecondary"
						>
							Discount
						</Typography>
						<Typography
							sx={{
								fontSize: { xs: 12, sm: 16 },
							}}
							color="success"
						>
							-&#36;{discountAmount.toFixed(2)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography
							sx={{
								fontSize: { xs: 15, sm: 16 },
							}}
							color="textSecondary"
						>
							Delivery fee
						</Typography>
						<Typography
							sx={{
								fontSize: { xs: 12, sm: 16 },
							}}
						>
							&#36;{deliveryFee}
						</Typography>
					</Box>
					<Divider sx={{ my: 2 }} />
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 1,
						}}
					>
						<Typography
							sx={{
								fontSize: { xs: 16, sm: 18 },
							}}
							color="textSecondary"
						>
							Total
						</Typography>
						<Typography
							sx={{
								fontSize: { xs: 14, sm: 16 },
							}}
						>
							&#36;{Number(total).toFixed(2)}
						</Typography>
					</Box>
				</Box>

				<Box sx={{ mt: 2 }}>
					{!location.pathname.includes("checkout") && (
						<Button
							variant="contained"
							color="primary"
							fullWidth
							sx={{ mb: 1, fontSize: { xs: 12, sm: 14, md: 16 } }}
							component={NavLink}
							to={"/checkout"}
						>
							Checkout
						</Button>
					)}
					<Button
						sx={{
							fontSize: { xs: 13, sm: 14, md: 16 },
							px: { xs: 5, sm: 0, md: 5 },
						}}
						component={NavLink}
						to={"/catalog"}
						fullWidth
					>
						Continue Shopping
					</Button>
				</Box>
			</Paper>

			{/* Coupon Code Section */}
			<Paper
				sx={{
					mb: 2,
					px: { xs: 1, sm: 1, md: 2, lg: 3 },
					py: { xs: 1, sm: 1, md: 3 },
					width: "100%",
					borderRadius: 3,
				}}
			>
				<form>
					<Typography
						sx={{ fontSize: { xs: 14, md: 16 } }}
						variant="subtitle1"
						component="label"
					>
						Do you have a discount coupon?
					</Typography>

					<TextField
						label="Coupon"
						variant="outlined"
						fullWidth
						sx={{ my: 1, fontSize: { xs: 12, sm: 14, md: 16 } }}
					/>

					<Button
						sx={{ mb: 1, fontSize: { xs: 12, sm: 14, md: 16 } }}
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
					>
						Apply
					</Button>
				</form>
			</Paper>
		</Box>
	);
}
