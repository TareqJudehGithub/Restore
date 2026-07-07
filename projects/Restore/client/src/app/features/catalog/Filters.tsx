import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";

import Search from "./Search";
import RadioButtonGroup from "../../shared/components/RadioButtonGroup";

import { Box, Button, FormGroup, Paper } from "@mui/material";
import CheckboxButtons from "../../shared/components/CheckboxButtons";

const sortOptions: SortProperties = [
	{ value: "name", label: "Alphabetical" },
	{ value: "priceDesc", label: "Price: High > Low" },
	{ value: "price", label: "Price: Low > High" },
];

export default function Filters({ filtersData: data }: FiltersProps) {
	const { orderBy, types, brands } = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 3,
			}}
		>
			<Paper>
				<Search />
			</Paper>
			<Paper sx={{ p: 3 }}>
				<RadioButtonGroup
					options={sortOptions}
					selectedValue={orderBy}
					onChange={(e) => dispatch(setOrderBy(e.target.value))}
				/>
			</Paper>
			<Paper sx={{ p: 3 }}>
				<CheckboxButtons
					items={data.brands}
					checked={brands}
					onChange={(items: string[]) => dispatch(setBrands(items))}
				/>
			</Paper>
			<Paper sx={{ p: 3 }}>
				<FormGroup>
					<CheckboxButtons
						items={data.types}
						checked={types}
						onChange={(items: string[]) => dispatch(setTypes(items))}
					/>
				</FormGroup>
			</Paper>
			<Button
				sx={{ mt: 0, justifyContent: "start" }}
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
