import { useLocation } from "react-router";
import { Divider, Paper, Typography } from "@mui/material";

export default function ServerError() {
	const { state } = useLocation();
	return (
		<Paper>
			{state.error ? (
				<>
					<Typography
						gutterBottom
						variant="h3"
						sx={{ px: 4, pt: 2 }}
						color="error"
					>
						{state.error.title}
						<Divider />
					</Typography>
					<Typography variant="body1" sx={{ px: 4 }}>
						{state.error.detail}
					</Typography>
				</>
			) : (
				<Typography gutterBottom variant="h5">
					Server Error
				</Typography>
			)}
		</Paper>
	);
}
