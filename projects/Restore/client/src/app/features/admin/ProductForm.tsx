import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type CreateProductScheme,
	createProductScheme,
} from "../../../lib/Schemas/createProductSchema";
import { useFetchProductsQuery } from "../catalog/catalogApi";
import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { setInventoryEditMode } from "../../layout/uiSlice";
import AppTextInput from "../../shared/components/AppTextInput";
import { useFetchFiltersQuery } from "../catalog/catalogApi";
import AppSelectInput from "../../shared/components/AppSelectInput";
import AppDropZone from "../../shared/components/AppDropzone";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../../models/product";
import {
	useCreateProductMutation,
	useUpdateProductMutation,
} from "./adminApi";
import { handleApiError } from "../../../util/util";

export default function ProductForm({ product }: ProductFormProps) {
	const { inventoryEditMode } = useAppSelector((state) => state.ui);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const { data } = useFetchFiltersQuery();

	const productsParams = useAppSelector((state) => state.catalog);
	const { refetch } = useFetchProductsQuery(productsParams);

	const [createProduct] = useCreateProductMutation();
	const [updateProduct] = useUpdateProductMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		control,
		handleSubmit,
		watch,
		reset,
		setError,
		formState: {
			isSubmitted,
			isSubmitSuccessful,
			isLoading,
			isReady,
			isValid,
		},
	} = useForm<CreateProductScheme>({
		mode: "onSubmit",
		resolver: zodResolver(createProductScheme),
	});
	// Preview URL
	const watchFile = watch("file") as (File & { preview?: string }) | undefined;

	const createFormData = (items: FieldValues): FormData => {
		const formData = new FormData();
		for (const key in items) {
			formData.append(key, items[key]);
		}
		return formData;
	};

	const onSubmit = async (data: CreateProductScheme) => {
		// Create a new product or update an existing one
		try {
			const formData = createFormData(data);
			if (product) {
				await updateProduct({
					id: product.id,
					data: formData,
				}).unwrap();
				// fetch and update products list(Catalog items)
			} else {
				await createProduct(formData).unwrap();
			}
			dispatch(setInventoryEditMode(false));
			refetch();

			return navigate("/inventory");

			// fetch and update products list(Catalog items)
		} catch (error) {
			console.log(error);
			handleApiError<CreateProductScheme>(error, setError, [
				"name",
				"brand",
				"type",
				"price",
				"quantityInStock",
				"description",
				"file",
				"pictureUrl",
			]);
			setSubmitting(false);
		}
	};
	const productSet = useRef(false);

	useEffect(() => {
		// Reset form to our product
		if (product && !productSet.current) {
			reset(product);
			productSet.current = true;
		}
		// Clean up
		return () => {
			if (watchFile?.preview) URL.revokeObjectURL(watchFile.preview);
		};
	}, [product, reset, watchFile]);

	return (
		<Container
			maxWidth="lg"
			component={Paper}
			sx={{
				p: 4,
				mx: "auto",
			}}
		>
			<Typography variant="h4" sx={{ mb: 4 }}>
				Product details
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3}>
					<Grid size={12}>
						<AppTextInput control={control} name="name" label="Name" />
					</Grid>
					<Grid size={6}>
						{data?.brands && (
							<AppSelectInput
								items={data.brands}
								control={control}
								name="brand"
								label="Brand"
							/>
						)}
					</Grid>
					<Grid size={6}>
						{data?.types && (
							<AppSelectInput
								items={data.types}
								control={control}
								name="type"
								label="Type"
							/>
						)}
					</Grid>
					<Grid size={6}>
						<AppTextInput
							control={control}
							type="number"
							name="price"
							label="Price"
						/>
					</Grid>
					<Grid size={6}>
						<AppTextInput
							control={control}
							type="number"
							name="quantityInStock"
							label="Quantity in stock"
						/>
					</Grid>
					<Grid size={12}>
						<AppTextInput
							control={control}
							name="description"
							label="Product Description"
							multiline
							rows={4}
						/>
					</Grid>
					<Grid
						size={12}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<AppDropZone control={control} name="file" />
						{/* Edit or Upload an image */}
						{watchFile?.preview ? (
							<img
								src={watchFile.preview}
								alt="preview of image"
								style={{ maxHeight: 200 }}
							/>
						) : product?.pictureUrl ? (
							<img
								src={product?.pictureUrl}
								alt="preview"
								style={{ maxHeight: 200 }}
							/>
						) : undefined}
					</Grid>
				</Grid>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mt: 3,
					}}
				>
					<Button
						onClick={() => dispatch(setInventoryEditMode(false))}
						variant="contained"
						color="inherit"
						component={Link}
						to="/inventory"
					>
						Cancel
					</Button>
					<Button
						loading={isSubmitted}
						variant="contained"
						color="success"
						type="submit"
						disabled={!isValid}
					>
						Submit
					</Button>
				</Box>
			</form>
		</Container>
	);
}
type ProductFormProps = {
	product: Product | undefined;
};
