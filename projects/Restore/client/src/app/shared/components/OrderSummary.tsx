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
import { useForm, type FieldValues } from "react-hook-form";
import {
	useAddCouponMutation,
	useRemoveCouponMutation,
} from "../../features/basket/basketApi";
import { Delete } from "@mui/icons-material";

export default function OrderSummary() {
	const location = useLocation();
	const isCheckout = location.pathname.includes("checkout");

	const { subtotal, deliveryFee, total, discountAmount, basket } = useBasket();
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { isSubmitting },
	} = useForm({ defaultValues: { code: "" } });
	const [addCoupon] = useAddCouponMutation();
	const [removeCoupon, { isLoading }] = useRemoveCouponMutation();

	const onSubmit = async (data: FieldValues) => {
		const code = String(data?.code ?? "").trim();
		if (!code) return;

		await addCoupon(code);
		reset({ code: "" });
	};

	const handlePresetCoupon = async () => {
		const presetCode = "GIVEME10";
		setValue("code", presetCode, { shouldDirty: true, shouldValidate: true });
		await handleSubmit(onSubmit)();
	};

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
							{discountAmount === 0 ? "N/A" : `-$${discountAmount.toFixed(2)}`}
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

			{isCheckout && (
				<Paper
					sx={{
						mb: 2,
						px: { xs: 1, sm: 1, md: 2, lg: 3 },
						py: { xs: 1, sm: 1, md: 3 },
						width: "100%",
						borderRadius: 3,
					}}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						{basket?.coupon && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									gap: 1,
								}}
							>
								<Typography variant="body2" sx={{ fontWeight: "bold" }}>
									{basket.coupon.name} applied
								</Typography>
								<Button
									type="button"
									disabled={isLoading}
									onClick={() => removeCoupon()}
									color="error"
									variant="text"
									sx={{ minWidth: 0, px: 1 }}
								>
									<Delete fontSize="small" />
									Remove coupon
								</Button>
							</Box>
						)}

						<TextField
							label={
								basket?.coupon || isSubmitting
									? "GIVEME10 coupon applied"
									: "Apply coupon"
							}
							variant="outlined"
							fullWidth
							disabled={!!basket?.coupon}
							{...register("code", { required: "Coupon code missing" })}
							sx={{ my: 1, fontSize: { xs: 12, sm: 14, md: 16 } }}
						/>

						<Button
							onClick={handlePresetCoupon}
							sx={{ mb: 1, fontSize: { xs: 12, sm: 14, md: 16 } }}
							type="button"
							variant="contained"
							color="primary"
							fullWidth
							disabled={isSubmitting || !!basket?.coupon}
						>
							{isSubmitting ? "Applying..." : "Get 10% discount now!"}
						</Button>
					</form>
				</Paper>
			)}
		</Box>
	);
}
