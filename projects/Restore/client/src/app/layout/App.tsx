import { useEffect, useState } from "react";

import type { Product } from "../models/product";
import Catalog from "../features/catalog/Catalog";
import { Container } from "@mui/material";
import NavBar from "./NavBar";

function App() {
	// States
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

	// Methods

	return (
		<>
			<NavBar />
			<Container maxWidth="xl" sx={{ mt: 14 }}>
				<Catalog products={products} />
			</Container>
		</>
	);
}

export default App;
