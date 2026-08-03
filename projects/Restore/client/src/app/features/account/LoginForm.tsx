import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema } from "../../../lib/Schemas/LoginSchema";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";
import {
	Container,
	Paper,
	Box,
	Typography,
	TextField,
	Button,
	IconButton,
	InputAdornment,
} from "@mui/material";

export default function LoginForm() {
	// Login
	const [login, { isLoading, error }] = useLoginMutation();
	const [fetchUserInfo] = useLazyUserInfoQuery();
	const location = useLocation();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const onSubmit = async (data: loginSchema) => {
		try {
			await login(data).unwrap();
			await fetchUserInfo();
			navigate(location.state?.from || "/catalog");
		} catch (error) {
			setError("password", { message: "Invalid username or password" });
			return;
		}
	};

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<loginSchema>({
		mode: "onSubmit",
		// Validate input fields using zodResolver
		resolver: zodResolver(loginSchema),
	});

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
						autoFocus
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
						defaultValue=""
						placeholder="john.smith@example.com"
					/>
					<TextField
						fullWidth
						label="Password"
						type={showPassword ? "text" : "password"}
						autoComplete="on"
						{...register("password")}
						error={!!errors.password}
						helperText={errors.password?.message}
						defaultValue=""
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											onClick={() => setShowPassword((prev) => !prev)}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
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
