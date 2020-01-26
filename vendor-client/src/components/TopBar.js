import * as React from "react";
import {
	HeaderNavigation,
	ALIGN,
	StyledNavigationList,
	StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";

function TopBar() {
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	return (
		<HeaderNavigation>
			<StyledNavigationList $align={ALIGN.center}>
				<StyledNavigationItem>
					<Link to="/">Our App</Link>
				</StyledNavigationItem>
			</StyledNavigationList>
			<StyledNavigationList $align={ALIGN.center} />

			{auth.isAuthenticated ? (
				<StyledNavigationList $align={ALIGN.center}>
					<StyledNavigationItem>
						<Button
							onClick={() => {
								dispatch(logoutUser());
							}}
						>
							Logout
						</Button>
					</StyledNavigationItem>
				</StyledNavigationList>
			) : (
				<StyledNavigationList $align={ALIGN.center}>
					<StyledNavigationItem>
						<StyledLink href="/register">Register</StyledLink>
					</StyledNavigationItem>
					<StyledNavigationItem>
						<StyledLink href="/login">Login</StyledLink>
					</StyledNavigationItem>
				</StyledNavigationList>
			)}
		</HeaderNavigation>
	);
}

export default TopBar;
