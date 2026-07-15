import {
	Box,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import type { ConfirmationToken } from "@stripe/stripe-js";
import { useBasket } from "../../../lib/hooks/useBasket";
import { BorderBottom } from "@mui/icons-material";

export default function Review({ confirmationToken }: ReviewProps) {
	const { basket, subTotalAfterDiscount } = useBasket();

	const addressString = () => {
		if (!confirmationToken?.shipping) {
			return "";
		}
		const { name, address } = confirmationToken.shipping;
		if (address?.line2 === null) {
			return `${name}, ${address?.line1}, ${address?.city}, 
			${address?.state}, ${address?.postal_code}, ${address?.country}`;
		} else {
			return `${name}, ${address?.line1}, ${address?.line2}, ${address?.city}, 
			${address?.state}, ${address?.postal_code}, ${address?.country}`;
		}
	};
	const paymentString = () => {
		if (!confirmationToken?.payment_method_preview) {
			return "";
		}
		const { card } = confirmationToken.payment_method_preview;
		return `${card?.brand.toUpperCase()}, **** **** **** ${card?.last4}, 
		Exp: ${card?.exp_month}/${card?.exp_year}`;
	};

	return (
		<div>
			<Box sx={{ mt: 4, width: "100%" }}>
				<Typography variant="h6" sx={{ fontWeight: "bold" }}>
					Billing and delivery information
				</Typography>
				<dl>
					<Typography component="dt" sx={{}}>
						Shipping address
					</Typography>
					<Typography component="dd" color="secondary" sx={{ mt: 1 }}>
						{addressString()}
					</Typography>

					<Typography component="dt" sx={{}}>
						Payment Details
					</Typography>
					<Typography component="dd" color="secondary" sx={{ mt: 1 }}>
						{paymentString()}
					</Typography>
				</dl>
			</Box>
			<Box sx={{ mt: 6 }}></Box>
			<Divider />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								gap: 2,
							}}
						>
							<TableCell sx={{ BorderBottom: "none" }}>Item Name</TableCell>
							<TableCell>Quantity Price</TableCell>
							<TableCell sx={{ BorderBottom: "none" }}>
								Item(s) Total
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{}}>
						{basket?.items.map((item) => (
							<TableRow key={item.productId} sx={{}}>
								<TableCell
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyItems: "end",
										justifyContent: "space-between",
										alignItems: "center",
										borderBottom: "none",
									}}
								>
									<Grid
										size={6}
										sx={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "start",
											alignItems: "center",
											gap: 2,
										}}
									>
										<span style={{ margin: "5px" }}>
											<img
												src={item.pictureUrl}
												alt={item.name}
												style={{ width: 40, height: 40 }}
											/>
										</span>
										<span style={{}}>{item.name}</span>
									</Grid>
									<Grid
										size={3}
										sx={{ gap: 2, display: "flex", justifyContent: "start" }}
									>
										<span style={{}}>x{item.quantity}</span>
										<span style={{}}>{item.price}</span>
									</Grid>
									<Grid
										size={3}
										sx={{ display: "flex", justifyContent: "end" }}
									>
										<span style={{}}>${item.price * item.quantity}</span>
									</Grid>
								</TableCell>
							</TableRow>
						))}
						<TableRow sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
							<TableCell sx={{ borderBottom: "none" }}>
								<span>Total: ${subTotalAfterDiscount}</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

type ReviewProps = {
	confirmationToken: ConfirmationToken | null;
};
