import type { Product } from "../../models/product";
import { useAddBasketItemMutation } from "../basket/basketApi";

import { NavLink } from "react-router";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
} from "@mui/material";

export default function ProductCard({ product }: ProductCardProps) {
	const [addBasketItem, { isLoading }] = useAddBasketItemMutation();

	return (
		<Card
			elevation={3}
			sx={{
				width: "100%",
				maxWidth: { xs: "100%", sm: 320 },
				borderRadius: 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				height: "100%",
			}}
		>
			<CardMedia
				sx={{
					height: { xs: 180, sm: 220 },
					backgroundSize: {
						xs: "cover",
						sm: "cover",
						md: "cover",
						lg: "cover",
					},

					//objectFit: "" // Ensures it doesn't stretch or distort
				}}
				image={product.pictureUrl}
				title={product.name}
				// sx={{
				// 	width: "100%",
				// 	maxWidth: "100%",
				// 	height: "100%",
				// 	overflow: "hidden",
				// 	borderRadius: 8,
				// 	backgroundColor: "#f5f5f5",
				// 	objectPosition: "center",
				// 	display: "block",
				// }}
			/>
			<CardContent
				sx={{ flexGrow: 1, px: { xs: 1.5, sm: 2 }, pb: { xs: 1, sm: 1.5 } }}
			>
				<Typography
					gutterBottom
					sx={{ textTransform: "uppercase", fontWeight: 600, lineHeight: 1.4 }}
					variant="subtitle2"
				>
					{product.name}
				</Typography>
				<Typography variant="h6" sx={{ color: "purple", fontWeight: 700 }}>
					${product.price.toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					gap: 1,
					px: { xs: 1.5, sm: 2 },
					pb: { xs: 1.5, sm: 2 },
				}}
			>
				<Button
					size="small"
					disabled={isLoading}
					onClick={() => addBasketItem({ product: product, quantity: 1 })}
				>
					Add to cart
				</Button>

				<Button
					component={NavLink}
					to={`/catalog/${product.id}`}
					size="small"
					sx={navLinkStyleDark}
				>
					View
				</Button>
			</CardActions>
		</Card>
	);
}

type ProductCardProps = {
	product: Product;
};

const navLinkStyleDark = {
	justifyContent: "center",
	color: "inherit",
	textDecoration: "none",
	":hover": {
		color: "gray",
		fontWeight: "bold",
	},
	"&.active": {
		color: "#baecf9",
	},
};
const navLinkStyleLight = {
	justifyContent: "center",
	color: "inherit",
	textDecoration: "none",
	":hover": {
		color: "#baecf9",
	},
	"&.active": {
		color: "#baecf9",
	},
};
