import type { Product } from "../../models/product";

import ProductList from "./ProductList";
// OR: import Button from "@mui/material/Button";

export default function Catalog({ products }: CatalogProps) {
	return (
		<>
			<ProductList products={products} />
		</>
	);
}

type CatalogProps = {
	products: Product[];
};
