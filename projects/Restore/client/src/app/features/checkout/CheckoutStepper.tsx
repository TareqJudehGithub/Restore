import { useState } from "react";
import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Box,
	Button,
	FormControlLabel,
} from "@mui/material";

import { CheckBox } from "@mui/icons-material";
import Review from "./Review";

const steps: string[] = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
	const [activeStep, setActiveStep] = useState<number>(0);

	const handleNext = () => {
		setActiveStep((step) => step + 1);
	};
	const handleBack = () => {
		setActiveStep((step) => step - 1);
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
					<AddressElement
						options={{
							mode: "shipping",
						}}
					/>
					<FormControlLabel
						sx={{
							display: "flex",
							justifyContent: "end",
							pt: 1,
						}}
						control={<CheckBox />}
						label="Save as default address"
					/>
				</Box>

				<Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
					<PaymentElement />
				</Box>
				<Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
					<Review />
				</Box>
			</Box>

			<Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
				<Button disabled={activeStep === 0} onClick={handleBack}>
					Back
				</Button>
				<Button onClick={handleNext}>Next</Button>
			</Box>
		</Paper>
	);
}
