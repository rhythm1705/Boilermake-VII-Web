import * as React from "react";
import { Tabs, Tab } from "baseui/tabs";
import CurrentOrders from "../components/CurrentOrders";
import Menu from "../components/Menu";
import axios from "axios";

import { useSelector } from "react-redux";

function Dashboard() {
	const [activeKey, setActiveKey] = React.useState("0");
	const auth = useSelector(state => state.auth);
	console.log("Vendor Data: ", auth);
	// axios
	// 	.post("/api/orders/", {
	// 		title: "Super Lunch",
	// 		items: [{ item: "5e2d01346a58ca5c2cc11ab6", quantity: 10 }],
	// 		vendor: "5e2cf42d72d23f508efe9ea9"
	// 	})
	// 	.then(res => {
	// 		console.log("new order ", res.data);
	// 	})
	// 	.catch(err => {
	// 		console.log("err", err);
	// 	});
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
