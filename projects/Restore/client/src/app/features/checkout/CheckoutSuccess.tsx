import {
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router";
import type { Order } from "../../models/order";
import { formatAddressString, formatPaymentString } from "../../../util/util";

export default function CheckoutSuccess() {
	const { state } = useLocation();
	const order = state.data as Order;

	if (!order) {
		<Typography>Problem accessing the order</Typography>;
	}

	return (
		<Container maxWidth="md">
			<>
				<Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
					Thank you for your order!
				</Typography>
				<Typography variant="body1" color="textSecondary" gutterBottom>
					your order <strong>#{order.id}</strong>
				</Typography>

				<Paper
					elevation={1}
					sx={{
						p: 2,
						mb: 2,
						display: "flex",
						flexDirection: "column",
						gap: 1.5,
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Order date
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							{order.orderDate}
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Payment method
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							{formatPaymentString(order.paymentSummary)}
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Shipping address
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							{formatAddressString(order.shippingAddress)}
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Amount
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							${order.total.toFixed(2)}
						</Typography>
					</Box>
					<Divider />
				</Paper>
				<Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
					<Button
						variant="contained"
						color="primary"
						component={Link}
						to={`/orders/${order.id}`}
					>
						View order
					</Button>
					<Button
						component={Link}
						to="/catalog"
						variant="outlined"
						color="primary"
					>
						Continue shopping
					</Button>
				</Box>
			</>
		</Container>
	);
}
