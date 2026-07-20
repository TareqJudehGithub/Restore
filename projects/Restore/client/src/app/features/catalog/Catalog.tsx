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
		<Grid container spacing={{ xs: 3, md: 4 }}>
			<Grid size={{ xs: 12, md: 3 }}>
				<Filters filtersData={filtersData} />
			</Grid>
			<Grid size={{ xs: 12, md: 9 }}>
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
