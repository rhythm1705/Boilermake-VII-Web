import React, { useSelector } from "react";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
	useHistory,
	useLocation
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Register from "./pages/Register";
import Login from "./pages/Login";
import TopBar from "./components/TopBar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = "/login";
	}
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ component: Component, ...rest }) {
	const auth = useSelector(state => state.auth);

	return (
		<Route
			{...rest}
			render={props =>
				auth.isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
}

const engine = new Styletron();

function App() {
	return (
		<Provider store={store}>
			<StyletronProvider value={engine}>
				<BaseProvider theme={LightTheme}>
					<Router>
						<TopBar />
						<Switch>
							<Route path="/" exact component={Landing}></Route>
							<Route
								path="/register"
								component={Register}
							></Route>
							<Route path="/login" component={Login}></Route>
							<PrivateRoute
								exact
								path="/dashboard"
								component={Dashboard}
							/>
						</Switch>
					</Router>
				</BaseProvider>
			</StyletronProvider>
		</Provider>
	);
}

export default App;
