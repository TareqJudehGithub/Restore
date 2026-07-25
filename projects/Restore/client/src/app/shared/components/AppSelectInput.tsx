import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import type { SelectProps } from "@mui/material/Select";
import {
	useController,
	type FieldValues,
	type UseControllerProps,
} from "react-hook-form";
("react-hook-form");

export default function AppSelectInput<T extends FieldValues>(
	props: AppTextInputProps<T>,
) {
	const { field, fieldState } = useController({ ...props });

	return (
		<FormControl fullWidth error={!!fieldState.error}>
			<InputLabel>{props.label}</InputLabel>
			<Select
				value={field.value || ""}
				label={props.label}
				onChange={field.onChange}
			>
				{props.items.map((item, index) => (
					<MenuItem key={index} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{fieldState.error?.message}</FormHelperText>
		</FormControl>
	);
}

type AppTextInputProps<T extends FieldValues> = {
	label: string;
	name: keyof T;
	items: string[];
} & UseControllerProps<T> &
	Partial<SelectProps>;
