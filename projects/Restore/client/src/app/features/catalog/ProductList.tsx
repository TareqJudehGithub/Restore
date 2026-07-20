import type { Product } from "../../models/product";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products }: ProductListProps) {
	return (
		<Grid container spacing={{ xs: 2, sm: 3 }}>
			{products.map((product) => (
				<Grid
					sx={{ display: "flex" }}
					size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
					key={product.id}
				>
					<ProductCard product={product} />
				</Grid>
			))}
		</Grid>
	);
}

type ProductListProps = {
	products: Product[];
};
