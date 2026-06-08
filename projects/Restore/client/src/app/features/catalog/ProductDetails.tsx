import { useParams } from "react-router";
import { useFetchProductDetailsQuery } from "./catalogApi";
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

	const { data: product, isLoading } = useFetchProductDetailsQuery(
		id ? +id : 0,
	);

	//#region useEffect - getProduct by id
	// const [product, setProduct] = useState<Product | null>(null);

	// // Fetch item
	// useEffect(() => {
	// 	const url = `https://localhost:5001/api/products/${id}`;

	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch(url);
	// 			const data = await response.json();
	// 			setProduct(data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	fetchData();
	// }, [id]);
	//#endregion

	if (!product || isLoading) return <div>Loading...</div>;

	const productDetails: { label: string; value: string | number }[] = [
		{ label: "Brand", value: product.brand },
		// { label: "Name", value: product.name },
		{ label: "Type", value: product.type },
		{ label: "Description", value: product.description },
		{ label: "quantity In Stock", value: product.quantityInStock },
	];

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
					<Table
						// Increase cell font size
						sx={{ "& td": { fontSize: "1rem" } }}
					>
						<TableBody>
							{productDetails.map((product, index) => (
								<TableRow key={index}>
									<TableCell align="left" sx={{ fontWeight: "bold" }}>
										{product.label}
									</TableCell>
									<TableCell align="left">{product.value}</TableCell>
								</TableRow>
							))}
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
