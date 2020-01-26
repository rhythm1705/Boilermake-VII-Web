import * as React from "react";
import { styled } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { Button } from "baseui/button";
import { useSelector } from "react-redux";

const Centered = styled("div", {
	display: "block",
	justifyContent: "center",
	alignItems: "center",
	height: "100%"
});

function Landing() {
	const auth = useSelector(state => state.auth);

	return (
		<Centered>
			<HeadingLevel>
				<Heading>
					Hi there! Welcome to the Vendor Client! We hope you get a
					lot of orders!
				</Heading>
			</HeadingLevel>
			<HeadingLevel>
				<Heading styleLevel={6}>BOILERMAKE 7 Project</Heading>
			</HeadingLevel>
			{auth.isAuthenticated && (
				<Button
					onClick={() => {
						window.location.href = "/dashboard";
					}}
				>
					Go to Dashboard
				</Button>
			)}
		</Centered>
	);
}

export default Landing;
