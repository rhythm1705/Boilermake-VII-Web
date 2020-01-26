import React, { useState, useEffect } from "react";
import { Button } from "baseui/button";
import { Modal, SIZE, ROLE } from "baseui/modal";
import Check from "baseui/icon/check";
import { ListItem, ListItemLabel } from "baseui/list";
import { useStyletron } from "baseui";
import axios from "axios";
import { useSelector } from "react-redux";
import QrReader from "react-qr-reader";

function Order(props) {
	const auth = useSelector(state => state.auth);
	const removeOrder = async () => {
		await axios
			.delete("/api/orders/" + props.id)
			.then(res => {
				console.log("deleted order", res);
			})
			.catch(err => {
				console.log("err", err);
			});
	};
	return (
		<ListItem
			endEnhancer={() => (
				<>
					<Button
						shape="round"
						size="compact"
						kind="secondary"
						onClick={removeOrder}
					>
						<Check />
					</Button>
				</>
			)}
		>
			<ListItemLabel
				description={"$ " + parseFloat(props.price).toFixed(2) / 100}
			>
				{props.title}
			</ListItemLabel>
		</ListItem>
	);
}

function Scan(props) {
	const [result, setResult] = useState("No Result");
	const handleScan = data => {
		if (data) {
			setResult(data);
			props.newOrder(data);
		}
	};
	const handleError = err => {
		console.error(err);
	};
	return (
		<div>
			<QrReader
				delay={300}
				onError={handleError}
				onScan={handleScan}
				style={{ width: "100%" }}
			/>
			<p>{result}</p>
		</div>
	);
}
function CurrentOrders() {
	const auth = useSelector(state => state.auth);
	const [newOrder, setNewOrder] = useState();
	// const [orderIds, setOrderIds] = useState(null);
	const [orders, setOrders] = useState([]);
	const [css] = useStyletron();
	const [isOpen, setIsOpen] = React.useState(false);
	const getNewOrder = value => {
		setNewOrder(value);
	};
	console.log("newOrder", newOrder);
	const getOrderIds = () => {
		// axios
		// 	.get("/api/vendors/" + auth.user.id + "/menu")
		// 	.then(res => {
		// 		setItemIds(res.data);
		// 	})
		// 	.catch(err => {
		// 		console.log("err", err);
		// 	});
	};

	useEffect(() => {
		// const getCurrentOrders = () => {
		// 	axios
		// 		.get("/api/vendors/" + auth.user.id + "/currentOrders")
		// 		.then(res => {
		// 			console.log("Current Orders", res.data);
		// 			setOrders(res.data);
		// 		})
		// 		.catch(err => {
		// 			console.log("err", err);
		// 		});
		// };
		// if (itemIds === null) {
		// 	getItemIds();
		// } else if (items.length !== itemIds.length) {
		// 	console.log("Fetching Menu", items.length, itemIds.length);
		// 	getCurrentOrders();
		// }
	}, [getOrderIds, orders]);
	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Scan</Button>
			<Modal
				onClose={() => setIsOpen(false)}
				closeable
				isOpen={isOpen}
				animate
				autoFocus
				size={SIZE.default}
				role={ROLE.dialog}
			>
				<Scan newOrder={getNewOrder}></Scan>
			</Modal>
			{orders.map(order => {
				return (
					<Order
						name={order.name}
						price={order.price}
						key={order._id}
						id={order._id}
						deleteOrder={getOrderIds}
					></Order>
				);
			})}
		</>
	);
}

export default CurrentOrders;
