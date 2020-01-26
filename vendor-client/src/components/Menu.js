import React, { useEffect } from "react";
import { Button } from "baseui/button";
import Delete from "baseui/icon/delete";
import { ListItem, ListItemLabel } from "baseui/list";
import { StatefulPopover } from "baseui/popover";
import { Input } from "baseui/input";
import axios from "axios";
import { useSelector } from "react-redux";

function Item(props) {
	const auth = useSelector(state => state.auth);
	const deleteItem = async () => {
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
		props.deleteItem();
	};
	return (
		<ListItem
			endEnhancer={() => (
				<>
					<Button
						shape="round"
						size="compact"
						kind="secondary"
						onClick={deleteItem}
					>
						<Delete />
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

function NewItem(props) {
	const auth = useSelector(state => state.auth);

	const [name, setName] = React.useState("");
	const [price, setPrice] = React.useState(0);

	const onChangeName = ({ target: { value } }) => {
		setName(value);
	};
	const onChangePrice = ({ target: { value } }) => {
		setPrice(value);
	};

	const createItem = async e => {
		e.preventDefault();
		let itemInfo = {
			name: name,
			price: price * 100,
			vendor: auth.user.id
		};
		console.log("itemInfo", itemInfo);
		let itemId = "";
		await axios
			.post("/api/items/", itemInfo)
			.then(res => {
				console.log("new item ", res.data);
				itemId = res.data._id;
			})
			.catch(err => {
				console.log("err", err);
			});
		await axios
			.patch("/api/vendors/" + auth.user.id + "/add", { item: itemId })
			.then(res => {
				console.log("Item added to vendor's menu. ", res.data);
			})
			.catch(err => {
				console.log("err", err);
			});
		props.insertItem();
	};
	return (
		<StatefulPopover
			content={({ close }) => (
				<form
					onSubmit={e => {
						createItem(e);
						close();
					}}
				>
					<Input
						placeholder="Name"
						required
						value={name}
						onChange={onChangeName}
					/>
					<Input
						startEnhancer="$"
						placeholder="Price"
						required
						value={price}
						onChange={onChangePrice}
					/>
					<Button type="submit">Create Item</Button>
				</form>
			)}
			focusLock
			returnFocus
			autoFocus
		>
			<Button>New Item</Button>
		</StatefulPopover>
	);
}

function Menu() {
	const auth = useSelector(state => state.auth);

	const [itemIds, setItemIds] = React.useState(null);
	const [items, setItems] = React.useState([]);

	const getItemIds = () => {
		axios
			.get("/api/vendors/" + auth.user.id + "/menu")
			.then(res => {
				setItemIds(res.data);
			})
			.catch(err => {
				console.log("err", err);
			});
	};

	useEffect(() => {
		const getMenuItems = () => {
			axios
				.post("/api/items/menu", {
					itemIds: itemIds
				})
				.then(res => {
					console.log("Items in menu", res.data);
					setItems(res.data);
				})
				.catch(err => {
					console.log("err", err);
				});
		};
		if (itemIds === null) {
			getItemIds();
		} else if (items.length !== itemIds.length) {
			console.log("Fetching Menu", items.length, itemIds.length);
			getMenuItems();
		}
	}, [itemIds, getItemIds, items]);

	return (
		<>
			<NewItem insertItem={getItemIds}></NewItem>
			{items.map(item => {
				return (
					<Item
						name={item.name}
						price={item.price}
						key={item._id}
						id={item._id}
						deleteItem={getItemIds}
					></Item>
				);
			})}
		</>
	);
}

export default Menu;
