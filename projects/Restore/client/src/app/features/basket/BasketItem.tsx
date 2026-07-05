import type { Item } from "../../models/basket";

import { Paper, Box, Typography, Grid, IconButton } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import {
	useRemoveBasketItemMutation,
	useIncreaseBasketItemQtyMutation,
} from "./basketApi";

export default function BasketItem({ item }: BasketItemProps) {
	const [removeBasketItem] = useRemoveBasketItemMutation();
	const [increaseBasketItemQty] = useIncreaseBasketItemQtyMutation();

	const { productId, name, pictureUrl, price, quantity } = item;

	return (
		<Paper
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",

				height: 140,
				borderRadius: 3,
				mb: 2,
				p: 1,
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Box
					component="img"
					src={pictureUrl}
					alt={name}
					sx={{
						width: 100,
						height: 100,
						objectFit: "cover",
						borderRadius: "4px",
						mr: 8,
						ml: 4,
					}}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 1,
						minWidth: 200,
					}}
				>
					<Typography variant="h6">{name}</Typography>

					<Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
						<Typography sx={{ fontSize: "1.1rem" }}>
							${price} x {quantity}
						</Typography>
						<Typography sx={{ fontSize: "1.1rem" }} color="primary">
							${price * quantity}
						</Typography>
					</Box>

					<Grid container spacing={1} sx={{ alignItems: "center" }}>
						{quantity == 0 ? (
							<IconButton
								disabled
								color="primary"
								size="small"
								sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
							>
								<Remove />
							</IconButton>
						) : (
							<IconButton
								onClick={() => removeBasketItem({ productId, quantity: 1 })}
								color="primary"
								size="small"
								sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
							>
								<Remove />
							</IconButton>
						)}
						<Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
							{quantity}
						</Typography>
						<IconButton
							onClick={() => increaseBasketItemQty({ productId, quantity: 1 })}
							color="primary"
							size="small"
							sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
						>
							<Add />
						</IconButton>
					</Grid>
				</Box>
			</Box>
			<IconButton
				color="error"
				size="small"
				sx={{
					border: 1,
					borderRadius: 1,
					minWidth: 0,
					alignSelf: "start",
					mr: 1,
					mt: 1,
				}}
				onClick={() => removeBasketItem({ productId, quantity: quantity })}
			>
				<Close />
			</IconButton>
		</Paper>
	);
}

type BasketItemProps = {
	item: Item;
};
