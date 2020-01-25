import * as React from "react";
import { styled } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";

const Centered = styled("div", {
	display: "block",
	justifyContent: "center",
	alignItems: "center",
	height: "100%"
});

function Dashboard() {
	return (
		<Centered>
			<HeadingLevel>
				<Heading>Hi there! Welocme to the Vendor Client!</Heading>
			</HeadingLevel>
			<HeadingLevel>
				<Heading styleLevel={6}>BOILERMAKE 7 Project</Heading>
			</HeadingLevel>
		</Centered>
	);
}

export default Dashboard;
