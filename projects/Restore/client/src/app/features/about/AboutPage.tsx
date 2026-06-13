import {
	Alert,
	AlertTitle,
	Collapse,
	Box,
	Button,
	ButtonGroup,
	Container,
	List,
	ListItem,
	Typography,
} from "@mui/material";
import {
	useLazyGetValidationErrorQuery,
	useLazyGet400ErrorQuery,
	useLazyGet401ErrorQuery,
	useLazyGet404ErrorQuery,
	useLazyGet500ErrorQuery,
} from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [open, setOpen] = useState(true);

	const [triggerValidationError] = useLazyGetValidationErrorQuery();
	const [trigger400Error] = useLazyGet400ErrorQuery();
	const [trigger401Error] = useLazyGet401ErrorQuery();
	const [trigger404Error] = useLazyGet404ErrorQuery();
	const [trigger500Error] = useLazyGet500ErrorQuery();

	// Helper function
	const getValidationError = async () => {
		try {
			await triggerValidationError().unwrap();
		} catch (error: unknown) {
			// TS Type Guard
			if (
				error &&
				typeof error === "object" &&
				"message" in error &&
				typeof (error as { message: unknown }).message === "string"
			) {
				const errorArray = (error as { message: string }).message.split(", ");
				setValidationErrors(errorArray);
			}
		}
	};

	return (
		<>
			<Container>
				<Typography gutterBottom variant="h3">
					Errors for testing
				</Typography>
				<ButtonGroup>
					<Button variant="contained" onClick={getValidationError}>
						Test Validation
					</Button>
					<Button
						variant="contained"
						onClick={() => trigger400Error().catch((err) => console.log(err))}
					>
						Test 400 Error
					</Button>

					<Button
						variant="contained"
						onClick={() => {
							trigger401Error().catch((err) => console.log(err));
						}}
					>
						Test 401 Error
					</Button>

					<Button
						variant="contained"
						onClick={() => {
							trigger404Error().catch((err) => console.log(err));
						}}
					>
						Test 404 Error
					</Button>

					<Button
						variant="contained"
						onClick={() => {
							trigger500Error().catch((err) => console.log(err));
						}}
					>
						Test 500 Error
					</Button>
				</ButtonGroup>
				{validationErrors.length > 0 && (
					<Collapse in={open}>
						<Alert
							severity="error"
							onClose={() => {
								setOpen((open) => !open);
							}}
						>
							<AlertTitle>Validation errors</AlertTitle>
							<List>
								{validationErrors.map((err) => (
									<ListItem key={err}>{err}</ListItem>
								))}
							</List>
						</Alert>
					</Collapse>
				)}
			</Container>
		</>
	);
}
