import * as React from "react";
import {
	HeaderNavigation,
	ALIGN,
	StyledNavigationList,
	StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { BrowserRouter as Link } from "react-router-dom";

function TopBar() {
	return (
		<HeaderNavigation>
			<StyledNavigationList $align={ALIGN.left}>
				<StyledNavigationItem>
					<Link to="/">Our App</Link>
				</StyledNavigationItem>
			</StyledNavigationList>
			<StyledNavigationList $align={ALIGN.center} />
			<StyledNavigationList $align={ALIGN.center}>
				<StyledNavigationItem>
					<StyledLink href="/register">Register</StyledLink>
				</StyledNavigationItem>
				<StyledNavigationItem>
					<StyledLink href="/login">Login</StyledLink>
				</StyledNavigationItem>
			</StyledNavigationList>
		</HeaderNavigation>
	);
}

export default TopBar;
