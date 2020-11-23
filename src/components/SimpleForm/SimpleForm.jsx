import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	firstName: yup
		.string()
		.required("First Name is a required field"),
	lastName: yup
		.string()
		.required("Last Name is a required field"),
	city: yup
		.string()
		.required("City is a required field"),
	zipCode: yup
		.string()
		.required("Zip Code is a required field")
		.matches(
			/^\d{5}$/,
			{
				message: "Zip code can only be numeric and 5 digits",
				excludeEmptyString: true
			}
		)
		.matches(
			/98107/,
			{
				message: "Address is not correct",
				excludeEmptyString: true
			}
		),
	emailAddress: yup
		.string()
		.required("Email Address is a required field")
		.email("Invalid Email Address"),
});

const useStyles = makeStyles( ( theme ) => ({
	root : {
		'& .MuiTextField-root' : {
			margin : theme.spacing( 1 ),
			width  : 200,
		},
	},
	submit: {
		'margin-top': '24px',
	},
}) );

function SimpleForm() {
	const classes = useStyles();

	const { register, errors, handleSubmit } = useForm({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		resolver: yupResolver(schema),
		criteriaMode: "firstError",
	});

	const onSubmit = data => {
		alert(
			`${data.firstName} ${data.lastName}
${data.city}, ${data.zipCode}
${data.emailAddress}`
		);
	};

	const hasAnyErrors = !!errors.firstName
		|| !!errors.lastName
		|| !!errors.city
		|| !!errors.zipCode
		|| !!errors.emailAddress;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off" >
			<div >
				<TextField
					error={!!errors.firstName}
					id="first-name"
					name="firstName"
					label="First Name"
					inputRef={register}
					defaultValue=""
					helperText={errors.firstName?.message}
				/>
				<TextField
					error={!!errors.lastName}
					id="last-name"
					name="lastName"
					label="Last Name"
					inputRef={register}
					defaultValue=""
					helperText={errors.lastName?.message}
				/>
				<TextField
					error={!!errors.city}
					id="city"
					name="city"
					label="City"
					inputRef={register}
					defaultValue=""
					helperText={errors.city?.message}
				/>
				<TextField
					error={!!errors.zipCode}
					id="zip-code"
					name="zipCode"
					label="Zip Code"
					inputRef={register}
					defaultValue=""
					helperText={errors.zipCode?.message}
				/>
				<TextField
					error={!!errors.emailAddress}
					id="email-address"
					name="emailAddress"
					label="Email Address"
					inputRef={register}
					defaultValue=""
					helperText={errors.emailAddress?.message}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					disabled={hasAnyErrors}
				>
					Submit
				</Button>
			</div >
		</form >
	);
}

export default SimpleForm;
