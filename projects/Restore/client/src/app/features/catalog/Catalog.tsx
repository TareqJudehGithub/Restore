import { useEffect, useState } from "react";
import type { Product } from "../../models/product";

import ProductList from "./ProductList";
// OR: import Button from "@mui/material/Button";

export default function Catalog() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const url: string = "https://localhost:5001/api/products";

		const fetchData = async () => {
			const response = await fetch(url);
			const data = await response.json();

			setProducts(data);
		};
		fetchData();
	}, []);

	return (
		<>
			<ProductList products={products} />
		</>
	);
}
