const express = require("express");
const router = express.Router();

// Load Order model
const Order = require("../../models/Order");

// Create an order
router.post("/", (req, res, next) => {
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
router.get("/", (req, res, next) => {
	let orders = [];
	req.body.orderIds.forEach(id => {
		Order.findById(req.params.id)
			.then(order => {
				orders.push(order);
			})
			.catch(next);
	});
	res.send(orders);
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
