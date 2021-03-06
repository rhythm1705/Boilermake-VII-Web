const express = require("express");
const router = express.Router();

// Load Order model
const Order = require("../../models/Order");

// Create an order
router.post("/", (req, res, next) => {
	console.log("ORDER CREATION", req);
	Order.create(req.body)
		.then(order => {
			res.send(order);
		})
		.catch(next);
});

// Delete an order by id
router.delete("/:id", (req, res, next) => {
	Order.findByIdAndRemove(req.params.id)
		.then(order => {
			res.send(order);
		})
		.catch(next);
});

// Add an item to a order
router.patch("/add/:id", (req, res, next) => {
	Order.findById(req.params.id)
		.then(order => {
			const itemId = req.body.item;
			if (itemId && !order.items.includes(itemId)) {
				order.items.push(itemId);
			}
			order
				.save()
				.then(order => res.json(order))
				.catch(err => console.log(err));
		})
		.catch(next);
});

// Remove an item from a order
router.patch("/remove/:id", (req, res, next) => {
	Order.findById(req.params.id)
		.then(order => {
			const itemId = req.body.item;
			if (order.items.includes(itemId)) {
				order.items = order.items.filter(id => {
					return id != launchId;
				});
			}
			order
				.save()
				.then(order => res.json(order))
				.catch(err => console.log(err));
		})
		.catch(next);
});

// Get all orders
router.get("/", (req, res, next) => {
	Order.find({})
		.then(order => {
			res.send(order);
		})
		.catch(next);
});

// Get all orders by ids
router.post("/user", async (req, res, next) => {
	console.log("ALL orders of a user", req.body.orders);
	let orders = [];
	await req.body.orders.forEach(id => {
		Order.findById(id)
			.then(order => {
				orders.push(order);
			})
			.catch(next);
	});
	setTimeout(() => res.send(orders), 3000);
});

// Get a order by id
router.get("/:id", (req, res, next) => {
	Order.findById(req.params.id)
		.then(order => {
			res.send(order);
		})
		.catch(next);
});

module.exports = router;
