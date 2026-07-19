import {
	Container,
	Typography,
	Paper,
	Box,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";
import { useFetchOrderQuery } from "./orderApi";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useUserInfoQuery } from "../account/accountApi";

export default function OrdersPage() {
	const { data: orders, isLoading } = useFetchOrderQuery();
	const { data: user } = useUserInfoQuery();
	const navigate = useNavigate();

	if (isLoading) return <Typography>Loading...</Typography>;

	if (!orders)
		return (
			<Typography variant="h5">
				No orders available for {user?.email}
			</Typography>
		);

	return (
		<Container maxWidth="md">
			<Typography variant="h5" align="center" gutterBottom>
				My orders
			</Typography>
			<Paper sx={{ borderRadius: 3 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">Order</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Total</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order) => (
							<TableRow
								key={order.id}
								hover
								onClick={() => navigate(`/orders/${order.id}`)}
								sx={{ cursor: "pointer" }}
							>
								<TableCell align="center">#{order.id}</TableCell>
								<TableCell>
									{format(order.orderDate, " dd MMM yyyy")}
								</TableCell>
								<TableCell>${order.total.toFixed(2)}</TableCell>
								<TableCell>{order.orderStatus}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</Container>
	);
}
