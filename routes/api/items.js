const express = require("express");
const router = express.Router();

// Load Item model
const Item = require("../../models/Item");

// Create an item
router.post("/", (req, res, next) => {
	Item.create(req.body)
		.then(item => {
			res.send(item);
		})
		.catch(next);
});

// Delete an item by id
router.delete("/:id", (req, res, next) => {
	Item.findByIdAndRemove(req.params.id)
		.then(item => {
			res.send(item);
		})
		.catch(next);
});

// Get all items
router.get("/", (req, res, next) => {
	Item.find({})
		.then(item => {
			res.send(item);
		})
		.catch(next);
});

// Get all items by ids
router.get("/", (req, res, next) => {
	let items = [];
	req.body.itemIds.forEach(id => {
		Item.findById(req.params.id)
			.then(item => {
				items.push(item);
			})
			.catch(next);
	});
	res.send(items);
});

// Get a item by id
router.get("/:id", (req, res, next) => {
	Item.findById(req.params.id)
		.then(item => {
			res.send(item);
		})
		.catch(next);
});

module.exports = router;
