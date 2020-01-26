import * as React from "react";
import { styled } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const Centered = styled("div", {
	display: "block",
	justifyContent: "center",
	alignItems: "center",
	height: "100%"
});

function Landing() {
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
		</Centered>
	);
}

export default Landing;
