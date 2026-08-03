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
				minHeight: { xs: 130, sm: 140 },
				borderRadius: 3,
				mb: 2,
				p: { xs: 1, sm: 1.5 },
				flexWrap: { xs: "wrap", sm: "nowrap" },
				gap: { xs: 1, sm: 0 },
			}}
		>
			<Box
				sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}
			>
				<Box
					component="img"
					src={pictureUrl}
					alt={name}
					sx={{
						width: { xs: 72, sm: 100 },
						height: { xs: 72, sm: 100 },
						objectFit: "cover",
						borderRadius: "4px",
						mr: { xs: 2, sm: 4 },
						ml: { xs: 1, sm: 2 },
					}}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: { xs: 0.5, sm: 1 },
						minWidth: { xs: 0, sm: 200 },
						flex: 1,
						py: { xs: 1, md: 2 },
					}}
				>
					<Typography
						variant="h6"
						sx={{ fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}
					>
						{name}
					</Typography>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: { xs: 2, sm: 4 },
							flexWrap: "wrap",
						}}
					>
						<Typography
							sx={{ fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}
						>
							${price} x {quantity}
						</Typography>
						<Typography
							sx={{ fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" } }}
							color="primary"
						>
							${price * quantity}
						</Typography>
					</Box>

					<Grid container spacing={1} sx={{ alignItems: "center" }}>
						{quantity == 0 ? (
							<IconButton
								disabled
								color="primary"
								size="small"
								sx={{
									border: 1,
									borderRadius: 2,
									minWidth: 0,
									width: { xs: 28, sm: 32 },
									height: { xs: 28, sm: 32 },
									"& .MuiSvgIcon-root": { fontSize: { xs: 18, sm: 20 } },
								}}
							>
								<Remove />
							</IconButton>
						) : (
							<IconButton
								onClick={() => removeBasketItem({ productId, quantity: 1 })}
								color="primary"
								size="small"
								sx={{
									border: 1,
									borderRadius: 1,
									minWidth: 0,
									width: { xs: 24, sm: 28 },
									height: { xs: 24, sm: 28 },
									"& .MuiSvgIcon-root": { fontSize: { xs: 18, sm: 20 } },
								}}
							>
								<Remove />
							</IconButton>
						)}
						<Typography
							sx={{
								fontWeight: "bold",
								fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem" },
							}}
						>
							{quantity}
						</Typography>
						<IconButton
							onClick={() => increaseBasketItemQty({ productId, quantity: 1 })}
							color="primary"
							size="small"
							sx={{
								border: 1,
								borderRadius: 1,
								minWidth: 0,
								width: { xs: 24, sm: 28 },
								height: { xs: 24, sm: 28 },
								"& .MuiSvgIcon-root": { fontSize: { xs: 18, sm: 20 } },
							}}
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
					width: { xs: 24, sm: 28 },
					height: { xs: 24, sm: 28 },
					"& .MuiSvgIcon-root": { fontSize: { xs: 18, sm: 20 } },
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
