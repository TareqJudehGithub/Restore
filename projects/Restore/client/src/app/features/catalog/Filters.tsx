import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";

import Search from "./Search";
import RadioButtonGroup from "../../shared/components/RadioButtonGroup";

import { Box, Button, Collapse, FormGroup, Paper } from "@mui/material";
import CheckboxButtons from "../../shared/components/CheckboxButtons";

const sortOptions: SortProperties = [
	{ value: "name", label: "Alphabetical" },
	{ value: "priceDesc", label: "Price: High > Low" },
	{ value: "price", label: "Price: Low > High" },
];

export default function Filters({ filtersData: data }: FiltersProps) {
	const { orderBy, types, brands } = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [showFilterOptions, setShowFilterOptions] = useState(false);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: { xs: 2, md: 3 },
			}}
		>
			<Paper sx={{ overflow: "hidden" }}>
				<Search />
			</Paper>
			<Paper sx={{ p: { xs: 2, sm: 3 } }}>
				<RadioButtonGroup
					options={sortOptions}
					selectedValue={orderBy}
					onChange={(e) => dispatch(setOrderBy(e.target.value))}
				/>
			</Paper>
			{isMobile ? (
				<Paper
					sx={{
						p: { xs: 2, sm: 3 },
						top: { xs: 72, sm: 80 },
						zIndex: 2,
						backgroundColor: "background.paper",
					}}
				>
					<Button
						fullWidth
						variant="outlined"
						onClick={() => setShowFilterOptions((prev) => !prev)}
					>
						{showFilterOptions ? "Done" : "Filters"}
					</Button>
					<Collapse in={showFilterOptions} sx={{ mt: 0 }}>
						<Paper sx={{ p: { xs: 2, sm: 3 }, mb: 0 }}>
							<CheckboxButtons
								items={data.brands}
								checked={brands}
								onChange={(items: string[]) => dispatch(setBrands(items))}
							/>
						</Paper>
						<Paper sx={{ p: { xs: 2, sm: 3 }, mb: 0 }}>
							<FormGroup>
								<CheckboxButtons
									items={data.types}
									checked={types}
									onChange={(items: string[]) => dispatch(setTypes(items))}
								/>
							</FormGroup>
						</Paper>
					</Collapse>
				</Paper>
			) : (
				<>
					<Paper sx={{ p: { xs: 2, sm: 3 } }}>
						<CheckboxButtons
							items={data.brands}
							checked={brands}
							onChange={(items: string[]) => dispatch(setBrands(items))}
						/>
					</Paper>
					<Paper sx={{ p: { xs: 2, sm: 3 } }}>
						<FormGroup>
							<CheckboxButtons
								items={data.types}
								checked={types}
								onChange={(items: string[]) => dispatch(setTypes(items))}
							/>
						</FormGroup>
					</Paper>
				</>
			)}
			<Button
				sx={{ mt: 0, justifyContent: "start", px: 0 }}
				onClick={() => dispatch(resetParams())}
			>
				Reset filters
			</Button>
		</Box>
	);
}

type SortProperties = {
	value: string;
	label: string;
}[];

type FiltersProps = {
	filtersData: {
		brands: string[];
		types: string[];
	};
};
