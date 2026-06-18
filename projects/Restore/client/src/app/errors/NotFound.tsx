import { Link, useLocation } from "react-router";
import { Button, Paper, Typography } from "@mui/material";
import { SearchOff } from "@mui/icons-material";

export default function NotFound() {
	const { state } = useLocation();
	return (
		<Paper
			sx={{
				height: 400,
				width: "50%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				margin: "auto",
				p: 4,
			}}
		>
			<SearchOff sx={{ fontSize: 75 }} color="primary" />
			<>
				<Typography variant="h5" gutterBottom color="error">
					Item not found - error code 404
				</Typography>
			</>

			<Button variant="contained" component={Link} to="/catalog">
				Catalog
			</Button>
		</Paper>
	);
}
