import type { Product } from "../../models/product";
import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: ProductListProps) {
	return (
		<Box
			sx={{
				display: "flex",
				flexWrap: "wrap",
				gap: 3,
				justifyContent: "center",
			}}
		>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</Box>
	);
}

type ProductListProps = {
	products: Product[];
};
