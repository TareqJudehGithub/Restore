import {
	useController,
	type FieldValues,
	type UseControllerProps,
} from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";

export default function AppDropZone<T extends FieldValues>(
	props: AppDropZoneProps<T>,
) {
	const { field, fieldState } = useController({ ...props });

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				const fileWithPreview = Object.assign(acceptedFiles[0], {
					preview: URL.createObjectURL(acceptedFiles[0]),
				});
				field.onChange(fileWithPreview);
			}
		},
		[field],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	const dzStyles = {
		display: "flex",
		border: "dashed 2px #767676",
		BorderColor: "#767676",
		borderRadius: "5px",
		paddingTop: "30px",
		alignItems: "center",
		width: 500,
		height: 200,
	};
	const dzActive = {
		display: "flex",
		border: "dashed 2px green",
		BorderColor: "green",
		borderRadius: "5px",
		paddingTop: "30px",
		alignItems: "center",
		width: 500,
		height: 200,
	};

	return (
		<div {...getRootProps()}>
			<FormControl
				style={isDragActive ? dzActive : dzStyles}
				error={!!fieldState.error}
			>
				<input {...getInputProps()} />
				<UploadFile sx={{ fontSize: "100px" }} />
				<Typography variant="h6">Drop image here</Typography>
				<FormHelperText>{fieldState.error?.message}</FormHelperText>
			</FormControl>
		</div>
	);
}

type AppDropZoneProps<T extends FieldValues> = {
	name: keyof T;
} & UseControllerProps<T>;
