import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";
import { object } from "zod";

export default function HomePage() {
	return (
		<Box
			sx={{
				maxWidth: "xl",
				mx: "auto",
				px: 4,
				position: "relative",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					position: "relative",
				}}
			>
				<img
					src="/images/hero1.jpg"
					alt="ski resort image"
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
						borderRadius: 10,
						zIndex: 0,
					}}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						position: "relative",
						borderRadius: 4,
						p: 8,
					}}
				>
					<Typography
						variant="h1"
						sx={{
							color: "white",
							fontWeight: "bold",
							textAlign: "center",
							my: 3,
						}}
					>
						Welcome to Restore!
					</Typography>
					<Button
						variant="contained"
						size="large"
						component={Link}
						to="/catalog"
						sx={{
							mt: 8,
							backgroundImage: "linear-gradient(to right, #2563eb, #06b6d4)",
							fontWeight: "bold",
							color: "white",
							border: "2px solid transparent",
							borderRadius: "16px",
							px: 8,
							py: 2,
						}}
					>
						Go to Shop
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
