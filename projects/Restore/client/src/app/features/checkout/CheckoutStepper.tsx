import { useState } from "react";
import {
	AddressElement,
	PaymentElement,
	useElements,
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
	StripeAddressElementChangeEvent,
	StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import { useBasket } from "../../../lib/hooks/useBasket";

const steps: string[] = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
	const [activeStep, setActiveStep] = useState<number>(0);
	const { data: address, isLoading } = useFetchAddressQuery();

	const [addressComplete, setAddressComplete] = useState<boolean>(false);
	const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
	const [savedAddressChecked, setSavedAddressChecked] =
		useState<boolean>(false);

	const elements = useElements();
	const [updateUserAddress] = useUpdateUserAddressMutation();
	const { total } = useBasket();

	const getStripedAddress = async () => {
		const addressElement = elements?.getElement("address");
		if (!addressElement) return null;
		const {
			value: { name, address },
		} = await addressElement.getValue();

		if (name && address) return { ...address, name };
	};

	const addressDefaults = address
		? {
				name: address.name ?? "",
				address: {
					line1: address.line1 ?? "",
					line2: address.line2 ?? "",
					city: address.city ?? "",
					state: address.state ?? "",
					postal_code: address.postal_code ?? "",
					country: address.country ?? "",
				},
			}
		: undefined;

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
		setActiveStep((step) => step + 1);
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
					<PaymentElement onChange={handlePaymentChange} />
				</Box>
				<Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
					<Review />
				</Box>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
				<Button disabled={activeStep === 0} onClick={handleBack}>
					Back
				</Button>
				<Button
					disabled={
						(activeStep === 0 && !addressComplete) ||
						(activeStep === 1 && !paymentComplete)
					}
					onClick={handleNext}
				>
					{activeStep === steps.length - 1 ? `Total $${total}` : "Next"}
				</Button>
			</Box>
		</Paper>
	);
}
