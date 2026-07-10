import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/Schemas/LoginSchema";
import {
	Container,
	Paper,
	Box,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import { useLoginMutation } from "./accountApi";

export default function LoginForm() {
	const [login, { isLoading }] = useLoginMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<loginSchema>({
		mode: "onSubmit",
		// Validate input fields using zodResolver
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: loginSchema) => {
		await login(data);
	};

	return (
		<Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: 8,
				}}
			>
				<LockOutlined
					sx={{
						mt: 3,
						fontSize: 40,
					}}
					color="secondary"
				/>
				<Typography variant="h5" sx={{ mt: 2 }}>
					Sign In
				</Typography>
				<Box
					component="form"
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						gap: 3,
						marginY: 3,
					}}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						fullWidth
						label="Email"
						//type="email"
						autoFocus
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						fullWidth
						label="Password"
						type="password"
						autoComplete="on"
						{...register("password")}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<Button disabled={isLoading} variant="contained" type="submit">
						Sign in
					</Button>
					<Typography sx={{ textAlign: "center" }}>
						Don't have an account?
						<Typography
							sx={{ ml: 2 }}
							component={Link}
							to="/register"
							color="primary"
						>
							Sign Up
						</Typography>
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}
