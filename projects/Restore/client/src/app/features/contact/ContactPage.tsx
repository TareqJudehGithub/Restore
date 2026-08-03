import emailjs from "@emailjs/browser";
import { useState, type ChangeEvent, type ComponentType } from "react";
import { useAppSelector } from "../../store/store";
import {
	Button,
	Container,
	Box,
	Stack,
	Paper,
	Typography,
} from "@mui/material";
import { LinkedIn, WhatsApp } from "@mui/icons-material";
import {
	Mail,
	MapPin,
	Send,
	CheckCircle,
	AlertCircle,
	LoaderCircle,
} from "lucide-react";
export default function ContactPage() {
	const { darkMode } = useAppSelector((state) => state.ui);

	const [formData, setFormData] = useState<FormDataType>({
		name: "",
		email: "",
		message: "",
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [submitStatus, setSubmitStatus] = useState<SubmitStatusType>({
		type: null,
		message: "",
	});
	const [open, setOpen] = useState(true);
	const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		setIsLoading(true);
		setSubmitStatus({ type: null, message: "" });

		try {
			// Import EmailJS .ENV variables
			const servicesId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
			const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY_ID;
			const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

			if (!servicesId || !publicKey || !templateId) {
				("EmailJS configuration is missing. Please check your environment variables.");
			}

			// Email
			await emailjs.send(
				servicesId,
				templateId,
				{
					name: formData.name,
					email: formData.email,
					message: formData.message,
				},
				publicKey,
			);

			emailjs.send(servicesId, templateId, {
				name: formData.name,
				email: formData.email,
			});

			setSubmitStatus({
				type: "success",
				message: "Thank you for your message. I will get back to you soon.",
			});
			formData.name = "";
			formData.email = "";
			formData.message = "";
			event.target.reset();

			setOpen(true);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
				setSubmitStatus({
					type: "error",
					message:
						error.message || "Error sending message. Please try again later.",
				});
			} else {
				console.log("Unexpected error type:", error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange =
		(field: keyof FormDataType) =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((current) => ({ ...current, [field]: event.target.value }));
		};

	const currentStatus = submitStatus ?? { type: null, message: "" };

	return (
		<Container
			maxWidth="xl"
			sx={{ py: { xs: 6, md: 10 }, position: "relative", overflow: "hidden" }}
		>
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					pointerEvents: "none",
				}}
			>
				<Box
					sx={{
						position: "absolute",
						top: "20%",
						left: "15%",
						width: 280,
						height: 280,
						borderRadius: "50%",
						background: "rgba(37, 99, 235, 0.10)",
						filter: "blur(80px)",
					}}
				/>
				<Box
					sx={{
						position: "absolute",
						bottom: "20%",
						right: "15%",
						width: 220,
						height: 220,
						borderRadius: "50%",
						background: "rgba(6, 182, 212, 0.12)",
						filter: "blur(70px)",
					}}
				/>
			</Box>

			<Box
				sx={{ position: "relative", zIndex: 1, maxWidth: 1100, mx: "auto" }}
			>
				<Box
					sx={{
						textAlign: "center",
						maxWidth: 760,
						mx: "auto",
						mb: { xs: 6, md: 8 },
					}}
				>
					<Typography
						variant="overline"
						sx={{
							color: "primary.main",
							fontWeight: 700,
							letterSpacing: 2,
						}}
					>
						Get in touch
					</Typography>
					<Typography
						variant="h2"
						sx={{
							fontWeight: 800,
							fontSize: { xs: "2rem", md: "3rem" },
							mb: 2,
						}}
					>
						Let’s build something great
					</Typography>
					<Typography
						variant="body1"
						sx={{
							lineHeight: 1.8,
							color: "text.secondary",
							fontSize: { xs: "1rem", md: "1.05rem" },
						}}
					>
						Have a project in mind? I’d love to hear about it. Send a message
						and let’s discuss how we can work together.
					</Typography>
				</Box>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
						gap: 4,
					}}
				>
					<Paper
						sx={{
							p: { xs: 3, md: 4 },
							borderRadius: 4,
							background:
								"linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(6, 182, 212, 0.16))",
							border: "1px solid rgba(255,255,255,0.12)",
							boxShadow: "0 20px 60px rgba(15, 23, 42, 0.14)",
						}}
					>
						<Box
							component="form"
							onSubmit={handleSubmit}
							sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
						>
							<Box>
								<Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
									Name
								</Typography>
								<Box
									component="input"
									required
									placeholder="Your name..."
									value={formData.name}
									onChange={handleInputChange("name")}
									sx={{
										width: "100%",
										px: 2,
										py: 1.5,
										borderRadius: 2,
										border: "1px solid",
										borderColor: "divider",
										backgroundColor: darkMode ? "#ffffff59" : "#ffffff8c",
										outline: "none",
										"&:focus": { borderColor: "primary.main" },
									}}
								/>
							</Box>

							<Box>
								<Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
									Email
								</Typography>
								<Box
									component="input"
									type="email"
									pattern="[^@\s]+@[^@\s]+\.[a-zA-Z]{3}"
									required
									placeholder="email@example.com"
									value={formData.email}
									onChange={handleInputChange("email")}
									sx={{
										width: "100%",
										px: 2,
										py: 1.5,
										borderRadius: 2,
										border: "1px solid",
										borderColor: "divider",
										backgroundColor: darkMode ? "#ffffff59" : "#ffffff8c",
										outline: "none",
										"&:focus": { borderColor: "primary.main" },
									}}
								/>
							</Box>

							<Box>
								<Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
									Message
								</Typography>
								<Box
									component="textarea"
									required
									rows={5}
									placeholder="Your message..."
									value={formData.message}
									onChange={handleInputChange("message")}
									sx={{
										width: "100%",
										px: 2,
										py: 1.5,
										borderRadius: 2,
										border: "1px solid",
										borderColor: "divider",
										backgroundColor: darkMode ? "#ffffff59" : "#ffffff8c",
										outline: "none",
										resize: "none",
										"&:focus": { borderColor: "primary.main" },
									}}
								/>
							</Box>

							<Button
								variant="contained"
								type="submit"
								size="large"
								fullWidth
								sx={{
									color: "whitesmoke",
									borderRadius: 999,
									py: 1.25,
									px: 6,
									alignSelf: "center",
									backgroundColor: darkMode
										? "#1f2937"
										: "radial-gradient(circle, #baecf9, #f0f9ff)",
								}}
								disabled={isLoading}
							>
								{isLoading ? (
									<span className="flex flex-row gap-2 items-center justify-center text-lg">
										<LoaderCircle className="animate-spin" />
										"Sending..."
									</span>
								) : (
									<span className="flex flex-row gap-2 items-center justify-center text-lg">
										Send Message <Send size={18} />
									</span>
								)}
							</Button>

							{currentStatus.type && open && (
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										p: 1.5,
										borderRadius: 2,
										backgroundColor:
											currentStatus.type === "success"
												? "success.main"
												: "error.main",
										color: "common.white",
									}}
									onClick={() => setOpen(false)}
								>
									{currentStatus.type === "success" ? (
										<CheckCircle />
									) : (
										<AlertCircle />
									)}

									<Typography variant="body2">
										{currentStatus.message}
									</Typography>
								</Box>
							)}
						</Box>
					</Paper>

					<Paper
						sx={{
							p: { xs: 3, md: 4 },
							borderRadius: 4,
							background:
								"linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(6, 182, 212, 0.16))",
							border: "1px solid rgba(255,255,255,0.12)",
							boxShadow: "0 20px 60px rgba(15, 23, 42, 0.14)",
						}}
					>
						<Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
							Contact information
						</Typography>
						<Stack spacing={1.5}>
							{contactInfo.map((item) => (
								<Box
									key={item.label}
									component="a"
									href={item.href}
									target="_blank"
									rel="noreferrer"
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 2,
										p: 1.5,
										borderRadius: 2,
										textDecoration: "none",
										color: "inherit",
										backgroundColor: "rgba(255,255,255,0.35)",
										transition: "background-color 0.2s ease",
										"&:hover": { backgroundColor: "rgba(255,255,255,0.55)" },
									}}
								>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											width: 44,
											height: 44,
											borderRadius: "50%",
											backgroundColor: "rgba(255,255,255,0.55)",
										}}
									>
										<item.icon />
									</Box>
									<Box>
										<Typography
											variant="body2"
											sx={{ color: "text.secondary" }}
										>
											{item.label}
										</Typography>
										<Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
											{item.value}
										</Typography>
									</Box>
								</Box>
							))}
						</Stack>
					</Paper>
				</Box>
			</Box>
		</Container>
	);
}

const contactInfo: ContactInfo[] = [
	{
		icon: LinkedIn,
		label: "LinkedIn",
		value: "Tareq Judeh",
		href: "https://www.linkedin.com/in/tareq-judeh-56051379/",
	},
	{
		icon: Mail,
		label: "Email",
		value: "tareq.joudeh@gmail.com",
		href: "mailto:tareq.joudeh@gmail.com",
	},
	{
		icon: WhatsApp,
		label: "WhatsApp",
		value: "+962 79 6969904",
		href: "https://wa.me/962796969904",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Amman, Jordan",
		href: "#contact",
	},
];

type ContactInfo = {
	icon: ComponentType<any>;
	label: string;
	value: string;
	href: string;
};

type FormDataType = {
	name: string;
	email: string;
	message: string;
};

type SubmitStatusType = {
	type: string | null;
	message: string;
};
