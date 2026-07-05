import { Typography, Grid } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";
import OrderSummary from "../../shared/components/OrderSummary";

export default function BasketPage() {
	const { data, isLoading, error } = useFetchBasketQuery();
	if (!data || data.items.length == 0)
		return <Typography variant="h5">Shopping Cart is empty</Typography>;

	if (error) return <Typography variant="h5">Error fetching data</Typography>;
	return (
		<>
			<Typography variant="h5" sx={{ marginBottom: "25px" }}>
				Shopping cart
			</Typography>
			{isLoading && <Typography variant="h3">Loading...</Typography>}

			<Grid container spacing={2}>
				<Grid size={8}>
					{data.items.map((item) => (
						<BasketItem key={item.productId} item={item} />
					))}
				</Grid>
				<Grid size={4}>
					<OrderSummary />
				</Grid>
			</Grid>
		</>
	);
}
