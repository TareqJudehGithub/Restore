import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";

export default function Catalog() {
	const { data, isLoading } = useFetchProductsQuery();

	if (isLoading || !data) return <h3>Loading...</h3>;

	return (
		<>
			<ProductList products={data} />
		</>
	);
}

//#region useEffect, useState hooks
//const [products, setProducts] = useState<Product[]>([]);

// useEffect(() => {
// 	const url: string = "https://localhost:5001/api/products";

// 	const fetchData = async () => {
// 		const response = await fetch(url);
// 		const data = await response.json();

// 		setProducts(data);
// 	};
// 	fetchData();
// }, []);
//#endregion
