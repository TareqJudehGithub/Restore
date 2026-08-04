import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";

export default function Search() {
	const { searchTerm } = useAppSelector((state) => state.catalog);
	const dispatch = useAppDispatch();
	const [term, setTerm] = useState(searchTerm);

	useEffect(() => {
		setTerm(searchTerm);
	}, [searchTerm]);

	const debounceSearch = useMemo(
		() =>
			debounce((value: string) => {
				dispatch(setSearchTerm(value));
			}, 500),
		[dispatch],
	);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setTerm(value);
		debounceSearch(value);
	};

	return (
		<TextField
			sx={{
				mt: 1,
				height: "62px",
			}}
			label="Search products.."
			variant="outlined"
			fullWidth
			type="search"
			value={term}
			onChange={handleChange}
		/>
	);
}
