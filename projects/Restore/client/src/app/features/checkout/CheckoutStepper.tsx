import { useEffect, useMemo, useState } from "react";
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
	Typography,
	Tooltip,
	IconButton,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

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

	const savedAddress = data as
		| (Partial<Address> & { name?: string })
		| undefined;
	const name = savedAddress?.name ?? "";
	const address = savedAddress
		? {
				line1: savedAddress.line1 ?? "",
				line2: savedAddress.line2 ?? "",
				city: savedAddress.city ?? "",
				state: savedAddress.state ?? "",
				postal_code: savedAddress.postal_code ?? "",
				country: savedAddress.country ?? "",
			}
		: undefined;
	const getStripedAddress = async () => {
		const addressElement = elements?.getElement("address");
		if (!addressElement) return null;

		const {
			value: { name, address },
		} = await addressElement.getValue();

		if (name && address) return { ...address, name };
	};

	const [addressDefaults, setAddressDefaults] = useState({
		name: "",
		address: {
			line1: "",
			line2: "",
			city: "",
			state: "",
			postal_code: "",
			country: "",
		},
	});
	useEffect(() => {
		if (!isLoading && data) {
			const nextDefaults = {
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
			setAddressDefaults((current) => {
				const hasEnteredValue = Boolean(
					current.name ||
					current.address.line1 ||
					current.address.city ||
					current.address.postal_code,
				);
				return hasEnteredValue ? current : nextDefaults;
			});
		}
	}, [address, data, isLoading, name]);
	const addressElementOptions = useMemo(
		() => ({
			mode: "shipping" as const,
			defaultValues: addressDefaults,
		}),
		[addressDefaults],
	);
	const addressElementKey = "address-element";

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
				<Box
					sx={{
						opacity: activeStep === 0 ? 1 : 0,
						height: activeStep === 0 ? "auto" : 0,
						overflow: "hidden",
						pointerEvents: activeStep === 0 ? "auto" : "none",
					}}
				>
					{!isLoading && addressDefaults && (
						<AddressElement
							key={addressElementKey}
							options={addressElementOptions}
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
								defaultChecked
								checked={savedAddressChecked ? savedAddressChecked : undefined}
								onChange={(e) => setSavedAddressChecked(e.target.checked)}
							/>
						}
						label="Save as default address"
					/>
				</Box>

				<Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
						<Typography variant="body2" color="text.secondary">
							Test card: 4242 4242 4242 4242
						</Typography>
						<Tooltip
							title="Use card number 4242 4242 4242 4242, any future expiration date, and any random 3-digit security code for testing."
							arrow
						>
							<IconButton size="small" aria-label="Test card help">
								<InfoOutlined fontSize="small" />
							</IconButton>
						</Tooltip>
					</Box>
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
