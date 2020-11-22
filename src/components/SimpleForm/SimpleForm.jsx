import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( ( theme ) => ({
	root : {
		'& .MuiTextField-root' : {
			margin : theme.spacing( 1 ),
			width  : 200,
		},
	},
}) );

function SimpleForm() {
	const classes = useStyles();

	return (
		<form className={classes.root} noValidate autoComplete="off" >
			<div >
				<TextField error id="standard-error" label="Error"
						   defaultValue="Hello World" />
				<TextField
					error
					id="standard-error-helper-text"
					label="Error"
					defaultValue="Hello World"
					helperText="Incorrect entry."
				/>
			</div >
			<div >
				<TextField
					error
					id="filled-error"
					label="Error"
					defaultValue="Hello World"
					variant="filled"
				/>
				<TextField
					error
					id="filled-error-helper-text"
					label="Error"
					defaultValue="Hello World"
					helperText="Incorrect entry."
					variant="filled"
				/>
			</div >
			<div >
				<TextField
					error
					id="outlined-error"
					label="Error"
					defaultValue="Hello World"
					variant="outlined"
				/>
				<TextField
					error
					id="outlined-error-helper-text"
					label="Error"
					defaultValue="Hello World"
					helperText="Incorrect entry."
					variant="outlined"
				/>
			</div >
		</form >
	);

	/*
	return (
		<Button variant="contained" color="primary">
			Hello WorldX
		</Button>
	);
	/*
	return (
	  <div className="App">
		<header className="App-header">
		  <img src={logo} className="App-logo" alt="logo" />
		  <p>
			Edit <code>src/App.js</code> and save to reload.
		  </p>
		  <a
			className="App-link"
			href="https://reactjs.org"
			target="_blank"
			rel="noopener noreferrer"
		  >
			Learn React
		  </a>
		</header>
	  </div>
	);
	 */
}

export default SimpleForm;
