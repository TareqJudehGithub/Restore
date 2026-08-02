import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";

const slides = [
	{
		src: "/images/ski_kids3.jpg",
		alt: "ski board",
		title: "",
	},
	{
		src: "/images/ski_board7.jpg",
		alt: "Ski resort image",
		title: "",
	},
	{
		src: "/images/ski_couple2.jpg",
		alt: "Ski resort image",
		title: "",
	},
	{
		src: "/images/ski_couple3.jpg",
		alt: "Mountain landscape",
		title: "",
	},
	{
		src: "/images/ski_women3.jpg",
		alt: "Snowy trail",
		title: "",
	},
	{
		src: "/images/ski_board6.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_men4.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_kids1.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_couple5.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_friends1.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_women2.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_men3a.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_googles2.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_kids7.jpg",
		alt: "Adventure gear",
		title: "",
	},
	{
		src: "/images/ski_googles4.jpg",
		alt: "Adventure gear",
		title: "",
	},
];

export default function HomePage() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(() => {
		if (typeof window === "undefined") return 1;
		if (window.innerWidth >= 1200) return 3;
		if (window.innerWidth >= 900) return 2;
		return 1;
	});

	useEffect(() => {
		const interval = window.setInterval(() => {
			setActiveIndex((current) => {
				const next = current + 1;
				return next >= slides.length ? 0 : next;
			});
		}, 5000);

		return () => window.clearInterval(interval);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setVisibleCount(
				window.innerWidth >= 1200 ? 3 : window.innerWidth >= 900 ? 2 : 1,
			);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const visibleSlides = slides.slice(
		activeIndex,
		Math.min(activeIndex + visibleCount, slides.length),
	);

	return (
		<>
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
								fontSize: { xs: "2.1rem", sm: "3rem", md: "5rem", lg: "7rem" },
							}}
						>
							Winter Adventures
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

			<Box sx={{ maxWidth: "xl", mx: "auto", px: { xs: 2, md: 4 }, mt: 4 }}>
				<Box
					sx={{
						position: "relative",
						borderRadius: 3,
						minHeight: { xs: 280, md: 300 },
						bgcolor: "grey.900",
						overflow: "hidden",
					}}
				>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								sm: "1fr",
								md: "repeat(2, minmax(0, 1fr))",
								lg: "repeat(3, minmax(0, 1fr))",
								xl: "repeat(3, minmax(0, 1fr))",
							},
							gap: 2,
							height: "100%",
							p: 2,
						}}
					>
						{visibleSlides.map((slide, index) => (
							<Box
								key={slide.src}
								sx={{
									position: "relative",
									overflow: "hidden",
									borderRadius: 2,
									minHeight: { xs: 220, md: 320 },
									maxHeight: { xs: 320 },
								}}
							>
								<img
									src={slide.src}
									alt={slide.alt}
									className="h-full w-full object-cover"
								/>
								<Box
									sx={{
										position: "absolute",
										inset: 0,
										background:
											"linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.1))",
										display: "flex",
										alignItems: "flex-end",
										p: { xs: 2, md: 3 },
									}}
								>
									<Typography
										variant="h6"
										sx={{ color: "white", fontWeight: "bold" }}
									>
										{slide.title}
									</Typography>
								</Box>
							</Box>
						))}
					</Box>

					<Box
						sx={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							px: 2,
						}}
					>
						<button
							type="button"
							className="rounded-full bg-black/40 p-2 text-white"
							onClick={() =>
								setActiveIndex(
									(current) => (current - 1 + slides.length) % slides.length,
								)
							}
						>
							‹
						</button>
						<button
							type="button"
							className="rounded-full bg-black/40 p-2 text-white"
							onClick={() =>
								setActiveIndex((current) => (current + 1) % slides.length)
							}
						>
							›
						</button>
					</Box>
				</Box>

				<Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
					{Array.from({ length: slides.length - 2 }).map((_, index) => (
						<button
							type="button"
							key={slides[index].src}
							aria-label={`Go to slide ${index + 1}`}
							onClick={() => setActiveIndex(index)}
							className={`h-3 w-3 rounded-full ${index === activeIndex ? "bg-sky-600" : "bg-gray-300"}`}
						/>
					))}
				</Box>
			</Box>
		</>
	);
}
