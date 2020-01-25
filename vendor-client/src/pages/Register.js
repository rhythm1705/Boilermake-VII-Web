import React, { useEffect } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Heading, HeadingLevel } from "baseui/heading";
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Alert } from "baseui/icon";
import { Button } from "baseui/button";

import { validate as validateEmail } from "email-validator";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/authActions";

function Negative() {
	const [css, theme] = useStyletron();
	return (
		<div
			className={css({
				display: "flex",
				alignItems: "center",
				paddingRight: theme.sizing.scale500,
				color: theme.colors.negative400
			})}
		>
			<Alert size="18px" />
		</div>
	);
}

function Register() {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [password2, setPassword2] = React.useState("");

	const [isValid, setIsValid] = React.useState(false);
	const [isVisited, setIsVisited] = React.useState(false);

	const [msg, setMsg] = React.useState();

	const dispatch = useDispatch();
	const error = useSelector(state => state.errors);

	const shouldShowError = !isValid && isVisited;

	useEffect(() => {
		if (JSON.stringify(error) !== "{}") {
			setMsg(error);
		}
	}, [error]);

	const onChangeName = ({ target: { value } }) => {
		setName(value);
	};
	const onChangeEmail = ({ target: { value } }) => {
		setIsValid(validateEmail(value));
		setEmail(value);
	};
	const onChangePassword = ({ target: { value } }) => {
		setPassword(value);
	};
	const onChangePassword2 = ({ target: { value } }) => {
		setPassword2(value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		let registerInfo = {
			name: name,
			email: email,
			password: password,
			password2: password2
		};
		console.log("RegisterInfo", registerInfo);
		dispatch(registerUser(registerInfo));
	};
	return (
		<HeadingLevel>
			<Heading>Create an account!</Heading>
			<form onSubmit={handleSubmit}>
				<FormControl label="Your name">
					<Input
						id="name"
						value={name}
						onChange={onChangeName}
						required
					/>
				</FormControl>
				<FormControl
					label="Your email"
					error={
						shouldShowError
							? "Please input a valid email address"
							: null
					}
				>
					<Input
						id="email"
						value={email}
						onChange={onChangeEmail}
						onBlur={() => setIsVisited(true)}
						error={shouldShowError}
						overrides={shouldShowError ? { After: Negative } : {}}
						type="email"
						required
					/>
				</FormControl>
				<FormControl
					label="Enter Password"
					error={shouldShowError ? "Password incorrect." : null}
				>
					<Input
						value={password}
						onChange={onChangePassword}
						type="password"
						required
					/>
				</FormControl>
				<FormControl
					label="Confirm Password"
					error={shouldShowError ? "Password incorrect." : null}
				>
					<Input
						value={password2}
						onChange={onChangePassword2}
						type="password"
						required
					/>
				</FormControl>
				<Button type="submit">Register</Button>
			</form>

			<Heading styleLevel={4}>
				Already have an account?{" "}
				<StyledLink href="/login">Login.</StyledLink>
			</Heading>
		</HeadingLevel>
	);
}

export default Register;
