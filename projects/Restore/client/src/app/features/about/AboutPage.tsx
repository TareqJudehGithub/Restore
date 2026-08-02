import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Stack,
	Typography,
} from "@mui/material";

export default function AboutPage() {
	return (
		<Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
			<Box
				sx={{
					mb: 6,
					p: { xs: 3, md: 6 },
					borderRadius: 4,
					background:
						"linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(6, 182, 212, 0.16))",
					border: "1px solid rgba(255,255,255,0.12)",
					boxShadow: "0 20px 60px rgba(15, 23, 42, 0.14)",
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
					About Winter Adventures
				</Typography>
				<Typography
					variant="h2"
					sx={{
						fontWeight: 800,
						fontSize: { xs: "2rem", md: "3rem" },
						mb: 2,
					}}
				>
					A modern storefront built for performance and polish
				</Typography>
				<Typography
					variant="body1"
					sx={{
						maxWidth: 900,
						lineHeight: 1.8,
						fontSize: { xs: "1rem", md: "1.1rem" },
						color: "text.secondary",
					}}
				>
					Restore brings together a full-stack e-commerce experience with a
					clean user interface, smooth shopping flow, and a robust backend. The
					project showcases how modern web technologies can be combined to
					create a responsive store that feels intuitive from the first click.
				</Typography>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={2}
					sx={{ mt: 3 }}
				>
					<Button
						variant="contained"
						size="large"
						component="a"
						href="/catalog"
						sx={{ borderRadius: 999, px: 3 }}
					>
						Explore the shop
					</Button>
					<Button
						variant="outlined"
						size="large"
						component="a"
						href="https://github.com/TareqJudehGithub/Restore"
						target="_blank"
						rel="noreferrer"
						sx={{ borderRadius: 999, px: 3 }}
					>
						View on GitHub
					</Button>
				</Stack>
			</Box>

			<Box sx={{ mb: 4 }}>
				<Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
					Featured work
				</Typography>
				<Typography
					variant="body1"
					sx={{ color: "text.secondary", maxWidth: 800 }}
				>
					These projects reflect the same design philosophy: strong UX,
					thoughtful architecture, and modern tooling that keeps the experience
					fast, reliable, and easy to maintain.
				</Typography>
			</Box>

			<Stack spacing={3}>
				{projects.map((project) => (
					<Card
						key={project.title}
						sx={{
							overflow: "hidden",
							borderRadius: 4,
							background:
								"linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(6, 182, 212, 0.16))",
							boxShadow: "0 16px 45px rgba(15, 23, 42, 0.12)",
							border: "1px solid rgba(255,255,255,0.12)",
						}}
					>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
							}}
						>
							<CardMedia
								component="img"
								image={project.image}
								alt={project.title}
								sx={{ height: { xs: 220, md: 350 }, objectFit: "cover" }}
							/>
							<CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
								<Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
									{project.title}
								</Typography>
								<Typography
									variant="body1"
									sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2 }}
								>
									{project.description}
								</Typography>
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
									{project.tags.map((tag) => (
										<Chip key={tag} label={tag} size="small" />
									))}
								</Box>
								<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
									<Button
										variant="contained"
										component="a"
										href={project.link}
										target="_blank"
										rel="noreferrer"
										sx={{ borderRadius: 999 }}
									>
										Visit site
									</Button>
									<Button
										variant="outlined"
										component="a"
										href={project.gitHub}
										target="_blank"
										rel="noreferrer"
										sx={{ borderRadius: 999 }}
									>
										GitHub
									</Button>
								</Stack>
							</CardContent>
						</Box>
					</Card>
				))}
			</Stack>
		</Container>
	);
}

const projects: ProjectsType[] = [
	{
		title: "Winter Adventures",
		description:
			"A full-stack e-commerce application built with ASP.NET Core Web API, React, Redux Toolkit, and RTK Query, featuring product browsing, account creation, checkout, order placement, and admin tools for managing inventory and product details.",
		image: "../../../../public/images/about/winter_adventures.png",
		tags: [
			"ASP.NET Core Web API",
			"ASP.NET Core Identity",
			"Entity Framework Core",
			"RESTful APIs",
			"SQL Server",
			"MSSQL",
			"Azure Cloud",
			"React.js",
			"TypeScript",
			"JavaScript",
			"HTML/CSS",
			"HTML/CSS",
			"GitHub",
			"Git",
		],
		link: "https://frosty-label-aqe2hgbrfucfhdhc.francecentral-01.azurewebsites.net/",
		gitHub: "https://github.com/TareqJudehGithub/Restore",
	},
];
type ProjectsType = {
	title: string;
	description: string;
	image: string;
	tags: string[];
	link: string;
	gitHub: string;
};
