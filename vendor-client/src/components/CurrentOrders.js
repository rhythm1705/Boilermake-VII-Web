import React, { useState } from "react";
import { Button } from "baseui/button";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalButton,
	SIZE,
	ROLE
} from "baseui/modal";
import Check from "baseui/icon/check";
import ChevronRight from "baseui/icon/chevron-right";
import { ListItem, ListItemLabel } from "baseui/list";
import { useStyletron } from "baseui";
import axios from "axios";
import { useSelector } from "react-redux";
import QrReader from "react-qr-reader";

function Order(props) {
	const auth = useSelector(state => state.auth);
	const removeOrder = async () => {
		await axios
			.delete("/api/items/" + props.id)
			.then(res => {
				console.log("deleted item", res);
			})
			.catch(err => {
				console.log("err", err);
			});
		await axios
			.patch("api/vendors/remove/" + auth.user.id, {
				item: props.id
			})
			.then(res => {
				console.log("remove item from vendor menu", res.data);
			})
			.catch(err => {
				console.log("err", err);
			});
		// props.removeOrder();
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
				{props.name}
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
	const [newOrder, setNewOrder] = useState();
	const [css] = useStyletron();
	const [isOpen, setIsOpen] = React.useState(false);
	const getNewOrder = value => {
		setNewOrder(value);
	};
	console.log("newOrder", newOrder);
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
			<ul
				className={css({
					width: "375px",
					paddingLeft: 0,
					paddingRight: 0
				})}
			>
				<ListItem
					endEnhancer={() => (
						<Button size="compact" kind="secondary" shape="pill">
							Action
						</Button>
					)}
				>
					<ListItemLabel>Label</ListItemLabel>
				</ListItem>
				<ListItem
					endEnhancer={() => (
						<React.Fragment>
							<Button
								shape="round"
								size="compact"
								kind="secondary"
							>
								<Check />
							</Button>
							<div style={{ width: "18px" }} />
							<Button
								shape="round"
								size="compact"
								kind="secondary"
							>
								<Check />
							</Button>
						</React.Fragment>
					)}
				>
					<ListItemLabel>Label</ListItemLabel>
				</ListItem>
				<ListItem endEnhancer={() => <ChevronRight />}>
					<ListItemLabel>Label</ListItemLabel>
				</ListItem>
				<ListItem
					endEnhancer={() => <ListItemLabel>Label</ListItemLabel>}
				>
					<ListItemLabel>Label</ListItemLabel>
				</ListItem>
			</ul>
		</>
	);
}

export default CurrentOrders;
