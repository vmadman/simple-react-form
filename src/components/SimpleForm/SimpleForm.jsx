import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FIELD_LABELS, VALIDATION_ERRORS } from "../../constants";

const schema = yup.object().shape({
	firstName: yup
		.string()
		.required(VALIDATION_ERRORS.FIRST_NAME_REQUIRED),
	lastName: yup
		.string()
		.required(VALIDATION_ERRORS.LAST_NAME_REQUIRED),
	city: yup
		.string()
		.required(VALIDATION_ERRORS.CITY_REQUIRED),
	zipCode: yup
		.string()
		.required(VALIDATION_ERRORS.ZIP_CODE_REQUIRED)
		.matches(
			/^\d{5}$/,
			{
				message: VALIDATION_ERRORS.ZIP_CODE_INVALID,
				excludeEmptyString: true
			}
		)
		.matches(
			/98107/,
			{
				message: VALIDATION_ERRORS.ZIP_CODE_MISMATCH,
				excludeEmptyString: true
			}
		),
	emailAddress: yup
		.string()
		.required(VALIDATION_ERRORS.EMAIL_ADDRESS_REQUIRED)
		.email(VALIDATION_ERRORS.EMAIL_ADDRESS_INVALID),
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
					label={FIELD_LABELS.FIRST_NAME}
					inputRef={register}
					defaultValue=""
					helperText={errors.firstName?.message}
				/>
				<TextField
					error={!!errors.lastName}
					id="last-name"
					name="lastName"
					label={FIELD_LABELS.LAST_NAME}
					inputRef={register}
					defaultValue=""
					helperText={errors.lastName?.message}
				/>
				<TextField
					error={!!errors.city}
					id="city"
					name="city"
					label={FIELD_LABELS.CITY}
					inputRef={register}
					defaultValue=""
					helperText={errors.city?.message}
				/>
				<TextField
					error={!!errors.zipCode}
					id="zip-code"
					name="zipCode"
					label={FIELD_LABELS.ZIP_CODE}
					inputRef={register}
					defaultValue=""
					helperText={errors.zipCode?.message}
				/>
				<TextField
					error={!!errors.emailAddress}
					id="email-address"
					name="emailAddress"
					label={FIELD_LABELS.EMAIL_ADDRESS}
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
