import { useAppDispatch, useAppSelector } from "../../store/store";
import { decrement, increment } from "./counterReducer";
import { ButtonGroup, Typography, Button } from "@mui/material";

export default function ContactPage() {
	const { data } = useAppSelector((state) => state.counter);
	const dispatch = useAppDispatch();

	return (
		<>
			<Typography variant="h2">Contact page</Typography>
			<Typography variant="body1">This is data: {data}</Typography>
			<ButtonGroup>
				<Button onClick={() => dispatch(decrement(1))} color="error">
					Decrement
				</Button>
				<Button onClick={() => dispatch(increment(1))} color="primary">
					Increment
				</Button>
				<Button onClick={() => dispatch(increment(5))} color="primary">
					Increment
				</Button>
			</ButtonGroup>
		</>
	);
}
