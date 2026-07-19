import { useState } from "react";
import {
	AddressElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import {
	useFetchAddressQuery,
	useUpdateUserAddressMutation,
} from "../account/accountApi";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Box,
	Button,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

import Review from "./Review";
import type { Address } from "../../models/User";
import type {
	ConfirmationToken,
	StripeAddressElementChangeEvent,
	StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import { useBasket } from "../../../lib/hooks/useBasket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "../Orders/orderApi";

const steps: string[] = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
	const [activeStep, setActiveStep] = useState<number>(0);

	const { data, isLoading } = useFetchAddressQuery();
	const [createOrder] = useCreateOrderMutation();

	const [addressComplete, setAddressComplete] = useState<boolean>(false);
	const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
	const [savedAddressChecked, setSavedAddressChecked] =
		useState<boolean>(false);
	const navigate = useNavigate();

	const [updateUserAddress] = useUpdateUserAddressMutation();
	const { basket, clearBasket } = useBasket();

	// Stripe Hooks and const
	const elements = useElements(); // contains user details (like address and payment)
	const stripe = useStripe();
	const [confirmationToken, setConfirmationToken] =
		useState<ConfirmationToken | null>(null);
	const [submitting, setSubmitting] = useState<boolean>(false);

	let name, address;
	if (data) {
		({ name, ...address } = data);
	}
	const getStripedAddress = async () => {
		const addressElement = elements?.getElement("address");
		if (!addressElement) return null;

		const {
			value: { name, address },
		} = await addressElement.getValue();

		if (name && address) return { ...address, name };
	};

	const addressDefaults = {
		name: name ?? "",
		address: {
			line1: address?.line1 ?? "",
			line2: address?.line2 ?? "",
			city: address?.city ?? "",
			state: address?.state ?? "",
			postal_code: address?.postal_code ?? "",
			country: address?.country ?? "",
		},
	};

	const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
		setAddressComplete(event.complete);
	};
	const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
		setPaymentComplete(event.complete);
	};

	const handleBack = () => {
		setActiveStep((step) => step - 1);
	};
	const handleNext = async () => {
		if (activeStep === 0 && savedAddressChecked && elements) {
			const userAddress = await getStripedAddress();
			if (userAddress) await updateUserAddress(userAddress);
		}
		// Stripe token
		if (activeStep === 1) {
			if (!elements || !stripe) {
				return;
			}
			const result = await elements.submit();
			if (result.error) {
				return toast.error(result.error.message);
			}
			const stripeResult = await stripe.createConfirmationToken({ elements });
			if (stripeResult.error) {
				return toast.error(stripeResult.error.message);
			}
			setConfirmationToken(stripeResult.confirmationToken);
		}
		if (activeStep === 2) {
			await confirmPayment();
		}
		if (activeStep < 2) setActiveStep((step) => step + 1);
	};
	// Confirm payment
	const confirmPayment = async () => {
		setSubmitting(true);
		try {
			if (!confirmationToken || !basket?.clientSecret) {
				throw new Error("Unable to process payment");
			}
			const orderModel = await createOrderModel();
			const orderResult = await createOrder(orderModel);

			const paymentResult = await stripe?.confirmPayment({
				clientSecret: basket.clientSecret,
				redirect: "if_required",
				confirmParams: {
					confirmation_token: confirmationToken.id,
				},
			});
			if (paymentResult?.paymentIntent?.status === "succeeded") {
				navigate("/checkout/success", { state: orderResult });
				clearBasket();
			} else if (paymentResult?.error) {
				throw new Error(paymentResult.error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
			setActiveStep((step) => step - 1);
		} finally {
			setSubmitting(false);
		}
	};

	const createOrderModel = async () => {
		const shippingAddress = await getStripedAddress();
		const paymentSummary = confirmationToken?.payment_method_preview.card;

		if (!shippingAddress || !paymentSummary) {
			throw new Error("Problem creating order");
		}

		return { shippingAddress, paymentSummary };
	};

	return (
		<Paper sx={{ p: 3, borderRadius: 3 }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					return (
						<Step key={index}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Box sx={{ mt: 2 }}>
				<Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
					{!isLoading && addressDefaults && (
						<AddressElement
							key={`${addressDefaults.name}-${addressDefaults.address.line1}-${addressDefaults.address.city}-${addressDefaults.address.country}`}
							options={{
								mode: "shipping",
								defaultValues: addressDefaults,
							}}
							onChange={handleAddressChange}
						/>
					)}
					<FormControlLabel
						sx={{
							display: "flex",
							justifyContent: "end",
							pt: 1,
						}}
						control={
							<Checkbox
								checked={savedAddressChecked}
								onChange={(e) => setSavedAddressChecked(e.target.checked)}
							/>
						}
						label="Save as default address"
					/>
				</Box>

				<Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
					<PaymentElement
						options={{
							wallets: {
								// Add below any payment method you wish to enable/disable
							},
						}}
						onChange={handlePaymentChange}
					/>
				</Box>
				<Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
					<Review confirmationToken={confirmationToken} />
				</Box>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
				<Button disabled={activeStep === 0} onClick={handleBack}>
					Back
				</Button>
				<Button
					disabled={
						(activeStep === 0 && !addressComplete) ||
						(activeStep === 1 && !paymentComplete) ||
						submitting
					}
					onClick={handleNext}
					loading={submitting}
				>
					{activeStep === steps.length - 1 ? "Place order" : "Next"}
				</Button>
			</Box>
		</Paper>
	);
}
