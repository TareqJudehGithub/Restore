import { useEffect, useState } from "react";

function App() {
	// States
	const [products, setProducts] = useState<{ name: string; price: number }[]>(
		[],
	);

	const addProduct = () => {
		setProducts((products) => [{ name: "product3", price: 300 }, ...products]);
	};

	useEffect(() => {
		const url: string = "https://localhost:5168/api/products";

		const fetchData = async () => {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			setProducts(data);
		};
		fetchData();
	}, []);
	return (
		<>
			<h1 style={{ color: "red" }}>Re-store</h1>
			<ul>
				{products.map((product, index) => (
					<li key={index}>
						{product.name} - {product.price}
					</li>
				))}
			</ul>
			<button onClick={addProduct}>Add Product</button>
		</>
	);
}

export default App;
