import {
	Box,
	Typography,
	Button,
	TableContainer,
	Paper,
	TableHead,
	TableCell,
	Table,
	TableRow,
	TableBody,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useFetchProductsQuery } from "../catalog/catalogApi";
import { Delete, Edit } from "@mui/icons-material";
import AppPagination from "../../shared/components/AppPagination";
import { setPageNumber } from "../catalog/catalogSlice";
import { setInventoryEditMode } from "../../layout/uiSlice";
import { Link } from "react-router";
import { useState } from "react";
import type { Product } from "../../models/product";
import ProductForm from "./ProductForm";
import { useDeleteProductMutation } from "./adminApi";

export default function InventoryPage() {
	const { inventoryEditMode } = useAppSelector((state) => state.ui);
	const productsParams = useAppSelector((state) => state.catalog);
	const { data, refetch } = useFetchProductsQuery(productsParams);
	const [deleteProduct] = useDeleteProductMutation();

	const dispatch = useAppDispatch();

	const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
		undefined,
	);

	const handleSelectProduct = (product: Product) => {
		setSelectedProduct(product);
	};
	const handleDeleteProduct = async (id: number) => {
		try {
			await deleteProduct(id);
			refetch();
		} catch (error) {
			console.log(error);
		}
	};

	if (selectedProduct && inventoryEditMode) {
		dispatch(setInventoryEditMode(true));
		return <ProductForm product={selectedProduct} />;
	}
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Typography sx={{ p: 2 }} variant="h4">
					Inventory
				</Typography>
				<Button
					sx={{ m: 2 }}
					size="large"
					variant="contained"
					component={Link}
					to="/productForm"
					onClick={() => dispatch(setInventoryEditMode(true))}
				>
					Create
				</Button>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }}>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell align="left">Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="center">Type</TableCell>
							<TableCell align="center">Brand</TableCell>
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data &&
							data.items.map((product) => (
								<TableRow
									key={product.id}
									sx={{
										"&:last-child td, &:last-child th": { border: 0 },
									}}
								>
									<TableCell component="th" scope="row">
										{product.id}
									</TableCell>
									<TableCell align="left">
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<img
												src={product.pictureUrl}
												alt={product.name}
												style={{ height: 50, marginRight: 20 }}
											/>
											<span>{product.name}</span>
										</Box>
									</TableCell>
									<TableCell align="right">&#36;{product.price}</TableCell>
									<TableCell align="center">{product.type}</TableCell>
									<TableCell align="center">{product.brand}</TableCell>
									<TableCell align="center">
										{product.quantityInStock}
									</TableCell>
									<TableCell align="right">
										<Button
											startIcon={<Edit />}
											onClick={() => {
												handleSelectProduct(product);
												dispatch(setInventoryEditMode(true));
											}}
										></Button>
										<Button
											startIcon={<Delete />}
											color="error"
											onClick={() => handleDeleteProduct(product.id)}
										></Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
				<Box>
					{data?.pagination && data.items.length > 0 && (
						<AppPagination
							metaData={data.pagination}
							onPageChange={(page: number) => dispatch(setPageNumber(page))}
						/>
					)}
				</Box>
			</TableContainer>
		</>
	);
}
