import emailjs from "@emailjs/browser";
import {
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router";
import type { Order } from "../../models/order";
import {
	confirmOrderTemplateId,
	formatAddressString,
	formatPaymentString,
	publicKey,
	servicesId,
} from "../../../util/util";
import { useEffect, useRef } from "react";

const EMAIL_SENT_STORAGE_KEY = "restore-email-confirmation-sent-orders";
const EMAIL_SENT_TTL_MS = 30 * 60 * 1000;

type StoredEmailSentEntry = {
	orderId: string;
	createdAt: number;
};

const readStoredOrderIds = () => {
	if (typeof window === "undefined") return [] as StoredEmailSentEntry[];

	try {
		const storedValue = window.sessionStorage.getItem(EMAIL_SENT_STORAGE_KEY);
		if (!storedValue) return [] as StoredEmailSentEntry[];

		const parsedValue = JSON.parse(storedValue) as StoredEmailSentEntry[];
		const now = Date.now();
		const activeEntries = parsedValue.filter(
			(entry) => now - entry.createdAt < EMAIL_SENT_TTL_MS,
		);

		if (activeEntries.length !== parsedValue.length) {
			window.sessionStorage.setItem(
				EMAIL_SENT_STORAGE_KEY,
				JSON.stringify(activeEntries),
			);
		}

		return activeEntries;
	} catch {
		return [] as StoredEmailSentEntry[];
	}
};

const saveStoredOrderId = (orderId: string) => {
	if (typeof window === "undefined") return;

	const sentOrderIds = readStoredOrderIds();
	const updatedEntries = [
		...sentOrderIds.filter((entry) => entry.orderId !== orderId),
		{ orderId, createdAt: Date.now() },
	];

	window.sessionStorage.setItem(
		EMAIL_SENT_STORAGE_KEY,
		JSON.stringify(updatedEntries),
	);
};

const clearStoredOrderIds = () => {
	if (typeof window === "undefined") return;
	window.sessionStorage.removeItem(EMAIL_SENT_STORAGE_KEY);
};

export default function CheckoutSuccess() {
	const { state } = useLocation();
	const order = state?.data as Order | undefined;
	const orderId = order?.id ? String(order.id) : null;
	const hasSentEmailRef = useRef(false);

	useEffect(() => {
		if (!orderId) return;

		const handleBeforeUnload = () => {
			clearStoredOrderIds();
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		if (hasSentEmailRef.current) return;

		const sentOrderIds = readStoredOrderIds();
		if (sentOrderIds.some((entry) => entry.orderId === orderId)) {
			hasSentEmailRef.current = true;
			return;
		}

		const sendOrderConfirmation = async () => {
			try {
				if (!order) {
					return;
				}

				if (!servicesId || !publicKey || !confirmOrderTemplateId) {
					console.warn("EmailJS configuration is missing.");
					return;
				}

				hasSentEmailRef.current = true;
				saveStoredOrderId(orderId);

				await emailjs.send(
					servicesId,
					confirmOrderTemplateId,
					{
						order: {
							id: order.id,
						},
						email: order.buyerEmail,
						orders: order.orderItems.map((item) => ({
							itemPictureUrl: item.pictureUrl,
							itemName: item.name,
							itemQuantity: item.quantity,
							itemPrice: item.price.toFixed(2),
						})),
						deliveryFees:
							order.deliveryFee === 0 ? "0.00" : order.deliveryFee.toFixed(2),
						discount: order.discount.toFixed(2),
						total: order.total.toFixed(2),
						subtotal: order.subtotal.toFixed(2),
						shippingAddress: formatAddressString(order.shippingAddress),
						paymentInfo: formatPaymentString(order.paymentSummary),
						orderDate: new Date(order.orderDate).toLocaleDateString(),
					},
					publicKey,
				);
			} catch (error) {
				hasSentEmailRef.current = false;
				console.error("Failed to send order confirmation email:", error);
			}
		};

		void sendOrderConfirmation();

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [orderId, order]);

	if (!order) {
		return <Typography>Problem accessing the order</Typography>;
	}

	return (
		<Container maxWidth="md">
			<>
				<Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
					Thank you for your order!
				</Typography>
				<Typography variant="body1" color="textSecondary" gutterBottom>
					your order <strong>#{order.id}</strong>
				</Typography>

				<Paper
					elevation={1}
					sx={{
						p: 2,
						mb: 2,
						display: "flex",
						flexDirection: "column",
						gap: 1.5,
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Order date
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							{order.orderDate}
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Payment method
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							{formatPaymentString(order.paymentSummary)}
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Shipping address
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							{formatAddressString(order.shippingAddress)}
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography variant="body2" color="textSecondary">
							Amount
						</Typography>
						<Typography variant="body2" sx={{ fontWeight: "bold" }}>
							${order.total.toFixed(2)}
						</Typography>
					</Box>
					<Divider />
				</Paper>
				<Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
					<Button
						variant="contained"
						color="primary"
						component={Link}
						to={`/orders/${order.id}`}
					>
						View order
					</Button>
					<Button
						component={Link}
						to="/catalog"
						variant="outlined"
						color="primary"
					>
						Continue shopping
					</Button>
				</Box>
			</>
		</Container>
	);
}
