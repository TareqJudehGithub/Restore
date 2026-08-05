import { useEffect, useMemo, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import OrderSummary from "../../shared/components/OrderSummary";
import CheckoutStepper from "./CheckoutStepper";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFetchBasketQuery } from "../basket/basketApi";
import { useCreatePaymentIntentMutation } from "./checkoutApi";
import { useAppSelector } from "../../store/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
	const { darkMode } = useAppSelector((state) => state.ui);
	const { data: basket } = useFetchBasketQuery();
	const [createPaymentIntent, { isLoading }] =
		useCreatePaymentIntentMutation();
	const created = useRef(false);

	useEffect(() => {
		// Prevent running createPaymentIntent twice in development.
		if (!created.current) createPaymentIntent();
		created.current = true;
	}, [createPaymentIntent]);

	const options: StripeElementsOptions | undefined = useMemo(() => {
		if (!basket?.clientSecret) return undefined;
		return {
			clientSecret: basket.clientSecret,
			appearance: {
				labels: "floating",
				theme: darkMode ? "night" : "stripe",
			},
		};
	}, [basket?.clientSecret, darkMode]);

	return (
		<Grid container spacing={2} sx={{}}>
			<Grid size={8}>
				{!stripePromise || !options || isLoading ? (
					<Typography variant="h6">
						Loading checkout... Please wait...
					</Typography>
				) : (
					<Elements stripe={stripePromise} options={options}>
						<CheckoutStepper />
					</Elements>
				)}
			</Grid>
			<Grid size={4}>
				<OrderSummary />
			</Grid>
		</Grid>
	);
}
