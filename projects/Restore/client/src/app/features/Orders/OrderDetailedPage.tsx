import { Link, useParams } from "react-router";
import { useFetchOrderDetailsQuery } from "./orderApi";
import {
	Typography,
	Card,
	Box,
	Button,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { formatAddressString, formatPaymentString } from "../../../util/util";

export default function OrderDetailedPage() {
	const { id } = useParams();

	const { data: order, isLoading } = useFetchOrderDetailsQuery(Number(id));

	if (isLoading) return <Typography>Loading...</Typography>;
	if (!order) return <Typography>Order not found</Typography>;
	return (
		<>
			<Card sx={{ p: 2, maxWidth: "md", mx: "auto" }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" align="center">
						Order Summary for #{order.id}
					</Typography>
					<Button component={Link} to="/orders" variant="outlined">
						Orders History
					</Button>
				</Box>

				<Divider sx={{ my: 2 }} />
				<Box>
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						Billing and delivery information
					</Typography>
					<Box component={"dl"}>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Shipping Address
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
							}}
						>
							{formatAddressString(order.shippingAddress)}
						</Typography>
					</Box>
					<Box component={"dl"}>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Payment information
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
							}}
						>
							{formatPaymentString(order.paymentSummary)}
						</Typography>
					</Box>
				</Box>
				<Divider sx={{ my: 2 }} />

				<Box>
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						Order Details
					</Typography>
					<Box component={"dl"}>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Email Address
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
							}}
						>
							{order.buyerEmail}
						</Typography>
					</Box>
					<Box component={"dl"}>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Order Status
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
							}}
						>
							{order.orderStatus}
						</Typography>
					</Box>

					<Box component={"dl"}>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Order Date
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
							}}
						>
							{format(order.orderDate, "dd MM yyyy")}
						</Typography>
					</Box>
				</Box>
				<Divider sx={{ my: 2 }} />

				<TableContainer sx={{ BorderBottom: "none" }}>
					<Table sx={{ BorderBottom: "none" }}>
						<TableBody sx={{}}>
							{order.orderItems.map((item) => (
								<TableRow key={item.productId} sx={{}}>
									<TableCell
										sx={{
											display: "flex",
											flexDirection: "row",

											justifyContent: "space-between",
											alignItems: "center",
											borderBottom: "none",
										}}
									>
										<Box
											sx={{
												display: "flex",
												justifyContent: "start",
												alignItems: "center",
												gap: 2,
											}}
										>
											<span style={{ margin: "5px", fontWeight: 500 }}>
												<img
													src={item.pictureUrl}
													alt={item.name}
													style={{ width: 40, height: 40 }}
												/>
											</span>
											<Box sx={{ display: "flex", flexDirection: "column" }}>
												<span style={{}}>{item.name}</span>
												<span>
													{item.quantity} * &#36;{item.price}
												</span>
											</Box>
										</Box>

										<Box
											component={"dl"}
											sx={{ display: "flex", justifyContent: "space-evenly" }}
										>
											<Typography
												variant="body2"
												component={"dd"}
												sx={{
													fontWeight: 300,
													pr: 1,
												}}
											>
												&#36;{item.quantity * item.price}
											</Typography>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<Box sx={{ mx: 3 }}>
					<Box
						component={"dl"}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						{/* <Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Quantity * price
						</Typography>
						{order.orderItems.map((item) => (
							<Typography
								key={item.productId}
								variant="body2"
								component={"dd"}
								sx={{
									fontWeight: 300,
									gap: 1,
								}}
							>
								{item.quantity} * {item.price}
							</Typography>
						))} */}
					</Box>

					<Box
						component={"dl"}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Subtotal
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
							}}
						>
							&#36;{Number(order.subtotal).toFixed(2)}
						</Typography>
					</Box>

					<Box
						component={"dl"}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Discount
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
								color: "green",
							}}
						>
							-&#36;{Number(order.discount).toFixed(2)}
						</Typography>
					</Box>

					<Box
						component={"dl"}
						sx={{ display: "flex", justifyContent: "space-between" }}
					>
						<Typography
							variant="subtitle1"
							component={"dt"}
							sx={{
								fontWeight: 500,
							}}
						>
							Delivery fees
						</Typography>
						<Typography
							variant="body2"
							component={"dd"}
							sx={{
								fontWeight: 300,
							}}
						>
							{order.deliveryFee === 0 ? (
								<>
									<span>Free </span>
									<span
										style={{ textDecoration: "line-through", color: "green" }}
									>
										&#36;{order.deliveryFee + 5}
									</span>
								</>
							) : (
								<span>&#36;{order.deliveryFee}</span>
							)}
						</Typography>
					</Box>
				</Box>

				<Box
					component={"dl"}
					sx={{ display: "flex", justifyContent: "space-between", mx: 3 }}
				>
					<Typography
						variant="subtitle1"
						component={"dt"}
						sx={{
							fontWeight: 700,
						}}
					>
						Total
					</Typography>
					<Typography
						variant="body2"
						component={"dd"}
						sx={{
							fontWeight: 600,
						}}
					>
						&#36;{Number(order.total).toFixed(2)}
					</Typography>
				</Box>
			</Card>
		</>
	);
}
