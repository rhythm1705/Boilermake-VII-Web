const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load Vendor model
const Vendor = require("../../models/Vendor");

// @route POST api/vendors/register
// @desc Register Vendor
// @access Public
router.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Vendor.findOne({ email: req.body.email }).then(vendor => {
		if (vendor) {
			return res.status(400).json("Email already exists");
		} else {
			const newVendor = new Vendor({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newVendor.password, salt, (err, hash) => {
					if (err) throw err;
					newVendor.password = hash;
					newVendor
						.save()
						.then(vendor => res.json(vendor))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route POST api/vendors/login
// @desc Login vendor and return JWT token
// @access Public
router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	// Find vendor by email
	Vendor.findOne({ email }).then(vendor => {
		// Check if vendor exists
		if (!vendor) {
			return res.status(404).json({ error: "Email not found" });
		}
		// Check password
		bcrypt.compare(password, vendor.password).then(isMatch => {
			if (isMatch) {
				// Vendor matched
				// Create JWT Payload
				const payload = {
					id: vendor.id,
					name: vendor.name,
					email: vendor.email,
					menu: vendor.menu
				};
				// Sign token
				jwt.sign(
					payload,
					process.env.SECRET_OR_KEY,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else {
				return res.status(400).json({ error: "Password incorrect" });
			}
		});
	});
});

// @route PATCH api/vendors/:id/add
// @desc Add an item to a vendor's menu
router.patch("/:id/add", (req, res, next) => {
	Vendor.findById(req.params.id)
		.then(vendor => {
			const itemId = req.body.item;
			if (itemId && !vendor.menu.includes(itemId)) {
				vendor.menu.push(itemId);
			}
			vendor
				.save()
				.then(vendor => res.json(vendor))
				.catch(err => console.log(err));
		})
		.catch(next);
});

// @route PATCH api/vendors/:id/remove
// @desc Remove an item from a vendor's menu
router.patch("/remove/:id", (req, res, next) => {
	Vendor.findById(req.params.id)
		.then(vendor => {
			const itemId = req.body.item;
			if (vendor.menu.includes(itemId)) {
				vendor.menu = vendor.menu.filter(id => {
					return id != itemId;
				});
			}
			vendor
				.save()
				.then(vendor => res.json(vendor))
				.catch(err => console.log(err));
		})
		.catch(next);
});

// @route GET api/vendors/menu by id
// @desc Get the vendor's menu
router.get("/:id/menu", (req, res, next) => {
	Vendor.findById(req.params.id)
		.then(vendor => {
			res.send(vendor.menu);
		})
		.catch(next);
});

// @route GET api/vendors/menu by name
// @desc Get the vendor's menu
router.get("/menu/:name/", (req, res, next) => {
	console.log("VENDOR's menu", req);
	Vendor.find({ name: req.params.name })
		.then(vendor => {
			res.send(vendor.menu);
		})
		.catch(next);
});
module.exports = router;
