import type { Product } from "../../models/product";
import { NavLink } from "react-router";
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Button,
	ListItem,
	List,
} from "@mui/material";

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<Card
			elevation={3}
			sx={{
				width: 280,
				borderRadius: 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<CardMedia
				sx={{ height: 240, backgroundSize: "cover" }}
				image={product.pictureUrl}
				title={product.name}
			/>
			<CardContent>
				<Typography
					gutterBottom
					sx={{ textTransform: "uppercase" }}
					variant="subtitle2"
				>
					{product.name}
				</Typography>
				<Typography variant="h6" sx={{ color: "purple" }}>
					${(product.price / 100).toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Button>Add to cart</Button>
				{/* <Button>View</Button> */}
				<Button
					component={NavLink}
					to={`/catalog/${product.id}`}
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
