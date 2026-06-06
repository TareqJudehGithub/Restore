import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Product } from "../../models/product";
import Grid from "@mui/material/Grid";
import {
	Button,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";

export default function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | null>(null);

	// Fetch item
	useEffect(() => {
		const url = `https://localhost:5001/api/products/${id}`;

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setProduct(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [id]);

	if (!product) return <div>Loading...</div>;
	return (
		<Grid container spacing={6} sx={{ mx: "auto" }}>
			<Grid size={6}>
				<img
					src={product.pictureUrl}
					alt={product.name}
					style={{ width: "100%" }}
				/>
			</Grid>
			<Grid size={6}>
				<Typography variant="h3">{product.name}</Typography>
				<Divider sx={{ mb: 2 }} />
				<Typography variant="h4">
					{(product.price / 100).toFixed(2)}
				</Typography>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align="right">Brand</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="right">Type</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell align="right">{product.brand}</TableCell>
								<TableCell align="right">{product.description}</TableCell>
								<TableCell align="right">{product.quantityInStock}</TableCell>
								<TableCell align="right">{product.type}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Grid container spacing={2} sx={{ marginTop: 3 }}>
					<Grid size={6}>
						<TextField
							size="small"
							variant="outlined"
							type="number"
							label="Quantity in basket"
							fullWidth
							defaultValue={1}
						/>
					</Grid>
					<Grid size={6}>
						<Button color="primary" size="large" variant="contained" fullWidth>
							Add to Basket
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
