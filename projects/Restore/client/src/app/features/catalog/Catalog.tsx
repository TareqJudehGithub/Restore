import { useAppDispatch, useAppSelector } from "../../store/store";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import ProductList from "./ProductList";
import AppPagination from "../../shared/components/AppPagination";

import {
	Box,
	CircularProgress,
	Grid,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
	const productsParams = useAppSelector((state) => state.catalog);
	const { data, isLoading } = useFetchProductsQuery(productsParams);
	const { data: filtersData, isLoading: isFiltersLoading } =
		useFetchFiltersQuery();
	const dispatch = useAppDispatch();

	if (isFiltersLoading || !filtersData) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: { xs: 240, md: 320 },
					py: 4,
				}}
			>
				<Paper
					elevation={0}
					sx={(theme) => ({
						width: "100%",
						maxWidth: 620,
						p: { xs: 3, md: 4 },
						borderRadius: 4,
						background:
							theme.palette.mode === "dark"
								? "linear-gradient(135deg, rgba(17,24,39,0.96), rgba(30,41,59,0.96))"
								: "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(240,247,255,0.96))",
						border: "1px solid",
						borderColor:
							theme.palette.mode === "dark"
								? "rgba(148, 163, 184, 0.28)"
								: "divider",
						boxShadow:
							theme.palette.mode === "dark"
								? "0 18px 45px rgba(2, 6, 23, 0.35)"
								: "0 18px 45px rgba(15, 23, 42, 0.08)",
					})}
				>
					<Stack
						spacing={2.25}
						sx={{ alignItems: "center", textAlign: "center" }}
					>
						<CircularProgress
							size={34}
							thickness={4}
							sx={(theme) => ({
								color:
									theme.palette.mode === "dark" ? "#60a5fa" : "primary.main",
							})}
						/>
						<Typography
							variant="h5"
							sx={(theme) => ({
								fontWeight: 700,
								color:
									theme.palette.mode === "dark" ? "#f8fafc" : "text.primary",
							})}
						>
							Fetching data please wait
						</Typography>
						<Typography
							variant="body1"
							sx={(theme) => ({
								maxWidth: 520,
								color:
									theme.palette.mode === "dark" ? "#cbd5e1" : "text.secondary",
								lineHeight: 1.6,
							})}
						></Typography>
					</Stack>
				</Paper>
			</Box>
		);
	} else if (isLoading || !data)
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: { xs: 240, md: 320 },
					py: 4,
				}}
			>
				<Paper
					elevation={0}
					sx={(theme) => ({
						width: "100%",
						maxWidth: 620,
						p: { xs: 3, md: 4 },
						borderRadius: 4,
						background:
							theme.palette.mode === "dark"
								? "linear-gradient(135deg, rgba(17,24,39,0.96), rgba(30,41,59,0.96))"
								: "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(240,247,255,0.96))",
						border: "1px solid",
						borderColor:
							theme.palette.mode === "dark"
								? "rgba(148, 163, 184, 0.28)"
								: "divider",
						boxShadow:
							theme.palette.mode === "dark"
								? "0 18px 45px rgba(2, 6, 23, 0.35)"
								: "0 18px 45px rgba(15, 23, 42, 0.08)",
					})}
				>
					<Stack
						spacing={2.25}
						sx={{ alignItems: "center", textAlign: "center" }}
					>
						<CircularProgress
							size={34}
							thickness={4}
							sx={(theme) => ({
								color:
									theme.palette.mode === "dark" ? "#60a5fa" : "primary.main",
							})}
						/>
						<Typography
							variant="h5"
							sx={(theme) => ({
								fontWeight: 700,
								color:
									theme.palette.mode === "dark" ? "#f8fafc" : "text.primary",
							})}
						>
							Waking up the catalog
						</Typography>
						<Typography
							variant="body1"
							sx={(theme) => ({
								maxWidth: 520,
								color:
									theme.palette.mode === "dark" ? "#cbd5e1" : "text.secondary",
								lineHeight: 1.6,
							})}
						>
							The Azure database is starting up, so this first load can take a
							little longer. Your request is still being processed — thank you
							for your patience.
						</Typography>
					</Stack>
				</Paper>
			</Box>
		);

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
