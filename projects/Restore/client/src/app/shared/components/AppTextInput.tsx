import { TextField, type TextFieldProps } from "@mui/material";
import {
	useController,
	type FieldValues,
	type UseControllerProps,
} from "react-hook-form";
("react-hook-form");

export default function AppTextInput<T extends FieldValues>(
	props: AppTextInputProps<T>,
) {
	const { field, fieldState } = useController({ ...props });

	return (
		<TextField
			fullWidth
			variant="outlined"
			{...props}
			{...field}
			multiline={props.multiline}
			rows={props.rows}
			type={props.type}
			value={field.value || ""}
			error={!!fieldState.error}
			helperText={fieldState.error?.message}
		/>
	);
}

type AppTextInputProps<T extends FieldValues> = {
	label: string;
	name: keyof T;
} & UseControllerProps<T> &
	TextFieldProps;
