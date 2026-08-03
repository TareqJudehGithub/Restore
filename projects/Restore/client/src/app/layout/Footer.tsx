import { GitHub, LinkedIn } from "@mui/icons-material";
import { useAppSelector } from "../store/store";
import { Typography } from "@mui/material";
import { NavLink } from "react-router";

export const Footer = () => {
	const { darkMode } = useAppSelector((state) => state.ui);
	const currentYear = new Date().getFullYear();

	return (
		<footer className="py-12 border-t border-border">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row items-center justify-between gap-8">
					{/* Logo & Copyright */}
					<div className="text-center md:text-left">
						<p className="text-sm text-muted-foreground mt-2">
							© {currentYear} Winter Adventures . All rights reserved.
						</p>
					</div>
					{/* Links */}
					<nav className="flex flex-wrap justify-center gap-6">
						{footerLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className={`text-sm text-muted-foreground ${darkMode ? "hover:text-foreground" : "hover:text-sky-600"}  transition-colors`}
							>
								{link.label}
							</a>
						))}
					</nav>

					{/* Social Links */}
					<div className="flex items-center gap-4">
						{socialLinks.map((social) => (
							<a
								key={social.label}
								href={social.href}
								aria-label={social.label}
								className={`p-2 rounded-full glass  ${darkMode ? "hover:text-gray-500" : "hover:text-sky-200 hover:bg-sky-600"} transition-all`}
							>
								<social.icon className="w-5 h-5" />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

const socialLinks = [
	{ icon: LinkedIn, href: "#", label: "LinkedIn" },
	{ icon: GitHub, href: "#", label: "GitHub" },
];

const footerLinks = [
	{ href: "/catalog", label: "Shop" },
	{ href: "/about", label: "About" },
	{ href: "/contact", label: "Contact" },
];
