import React, { useState, useEffect } from "react";
import { useStyletron } from "baseui";
import { FormControl } from "baseui/form-control";
import { Heading, HeadingLevel } from "baseui/heading";
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Alert } from "baseui/icon";
import { Button } from "baseui/button";

import { validate as validateEmail } from "email-validator";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../actions/authActions";

import {
	Redirect,
} from "react-router-dom";

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

function Login() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [isValid, setIsValid] = React.useState(false);
	const [isVisited, setIsVisited] = React.useState(false);

	const [msg, setMsg] = useState();

	const dispatch = useDispatch();
	const error = useSelector(state => state.errors);
	const auth = useSelector(state => state.auth);

	const shouldShowError = !isValid && isVisited;

	// let history = useHistory();
	// let location = useLocation();

	useEffect(() => {
		if (auth.isAuthenticated) {
			setMsg("Log in successful");
		} else if (error.error) {
			setMsg(error.error);
		}
	}, [auth.isAuthenticated, error]);

	const onChangeEmail = ({ target: { value } }) => {
		setIsValid(validateEmail(value));
		setEmail(value);
	};
	const onChangePassword = ({ target: { value } }) => {
		setPassword(value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		let loginInfo = {
			email: email,
			password: password
		};
		console.log("loginInfo", loginInfo);
		dispatch(loginUser(loginInfo));
		// const { from } = location.state || { from: { pathname: "/" } };
		// from.pathname = "/dashboard";
		// history.replace(from);
	};
	return (
		<>
			{auth.isAuthenticated ? (
				<Redirect to="/dashboard" />
			) : (
				<HeadingLevel>
					<Heading>Login to your account.</Heading>
					<form onSubmit={handleSubmit}>
						<FormControl
							label="Your email"
							error={
								shouldShowError
									? "Please input a valid email address"
									: null
							}
						>
							<Input
								id="input-id"
								value={email}
								onChange={onChangeEmail}
								onBlur={() => setIsVisited(true)}
								error={shouldShowError}
								overrides={
									shouldShowError ? { After: Negative } : {}
								}
								type="email"
								required
							/>
						</FormControl>
						<FormControl
							label="Enter Password"
							error={
								shouldShowError ? "Password incorrect." : null
							}
						>
							<Input
								value={password}
								onChange={onChangePassword}
								type="password"
								required
							/>
						</FormControl>
						<Button type="submit">Login</Button>
					</form>

					<Heading styleLevel={4}>
						No account?{" "}
						<StyledLink href="/register">Create one.</StyledLink>
					</Heading>
				</HeadingLevel>
			)}
			;
		</>
	);
}

export default Login;
