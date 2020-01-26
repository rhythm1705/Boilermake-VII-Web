import * as React from "react";
import { Tabs, Tab } from "baseui/tabs";
import CurrentOrders from "../components/CurrentOrders";
import Menu from "../components/Menu";

import { useSelector } from "react-redux";

function Dashboard() {
	const [activeKey, setActiveKey] = React.useState("0");
	const auth = useSelector(state => state.auth);
	console.log("Vendor Data: ", auth);
	return (
		<Tabs
			onChange={({ activeKey }) => {
				setActiveKey(activeKey);
			}}
			activeKey={activeKey}
		>
			<Tab title="Current Orders">
				<CurrentOrders />
			</Tab>
			<Tab title="Menu">
				<Menu />
			</Tab>
			<Tab title="Order History">Coming Soon!</Tab>
			<Tab title="Settings">Under Construction.</Tab>
		</Tabs>
	);
}

export default Dashboard;
