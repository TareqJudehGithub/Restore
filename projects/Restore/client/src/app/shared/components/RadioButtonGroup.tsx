import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import type { ChangeEvent } from "react";

export default function RadioButtonGroup({
	options,
	onChange,
	selectedValue,
}: RadioButtonGroupProps) {
	return (
		<FormControl>
			<RadioGroup onChange={onChange} value={selectedValue} sx={{ my: 0 }}>
				{options.map(({ value, label }) => (
					<FormControlLabel
						key={value}
						control={<Radio color="secondary" sx={{ py: 0.7 }} />}
						label={label}
						value={value}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}

export type RadioButtonGroupProps = {
	options: {
		value: string;
		label: string;
	}[];
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	selectedValue: string;
};
