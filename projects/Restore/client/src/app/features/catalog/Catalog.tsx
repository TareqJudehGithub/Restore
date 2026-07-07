import { useAppDispatch, useAppSelector } from "../../store/store";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import ProductList from "./ProductList";
import AppPagination from "../../shared/components/AppPagination";

import { Grid, Typography } from "@mui/material";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
	const productsParams = useAppSelector((state) => state.catalog);
	const { data, isLoading } = useFetchProductsQuery(productsParams);
	const { data: filtersData, isLoading: isFiltersLoading } =
		useFetchFiltersQuery();
	const dispatch = useAppDispatch();

	if (isLoading || !data || isFiltersLoading || !filtersData)
		return <h3>Loading...</h3>;

	return (
		<Grid container spacing={4}>
			<Grid size={3}>
				<Filters filtersData={filtersData} />
			</Grid>
			<Grid size={9}>
				{data.items && data.items.length > 0 ? (
					<>
						<ProductList products={data.items} />
						<AppPagination
							metaData={data.pagination}
							onPageChange={(page) => {
								dispatch(setPageNumber(page));
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
						/>
					</>
				) : (
					<Typography variant="h5">No Items found</Typography>
				)}
			</Grid>
		</Grid>
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
