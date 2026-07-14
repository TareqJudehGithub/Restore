import {
	Box,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import { useFetchBasketQuery } from "../basket/basketApi";

export default function Review() {
	const { data: basket } = useFetchBasketQuery();

	return (
		<div>
			<Box sx={{ mt: 4, width: "100%" }}>
				<Typography variant="h6" sx={{ fontWeight: "bold" }}>
					Billing and delivery information
				</Typography>
				<dl>
					<Typography component="dt" sx={{}}>
						Shipping address
					</Typography>
					<Typography component="dd" color="secondary" sx={{ mt: 1 }}>
						Address goes here
					</Typography>

					<Typography component="dt" sx={{}}>
						Payment Details
					</Typography>
					<Typography component="dd" color="secondary" sx={{ mt: 1 }}>
						Payment Details goe here
					</Typography>
				</dl>
			</Box>
			<Box sx={{ mt: 6 }}></Box>
			<Divider />
			<TableContainer>
				<Table>
					<TableBody>
						{basket?.items.map((item) => (
							<TableRow key={item.productId} sx={{}}>
								<TableCell
									sx={{
										display: "flex",
										flexDirection: "row",
										justifyItems: "start",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											alignItems: "center",
											gap: 2,
										}}
									>
										<span style={{ margin: "5px" }}>
											<img
												src={item.pictureUrl}
												alt={item.name}
												style={{ width: 40, height: 40 }}
											/>
										</span>
										<span style={{}}>{item.name}</span>
										<span style={{}}>x{item.quantity}</span>
									</Box>
									<Box>
										<span style={{}}>${item.price}</span>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
