const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json("Email already exists");
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});
			// Hash password before saving in database
			console.log(req.body.password);
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login user and return JWT token
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
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ error: "Email not found" });
		}
		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user.id,
					name: user.name,
					email: user.email
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

// @route PATCH api/users/:id/add
// @desc Add an order to a user's orders
router.patch("/:id/add", (req, res, next) => {
	User.findById(req.params.id)
		.then(user => {
			const orderId = req.body.order;
			if (orderId && !user.orders.includes(orderId)) {
				user.orders.push(orderId);
			}
			user.save()
				.then(user => res.json(user))
				.catch(err => console.log(err));
		})
		.catch(next);
});

// @route PATCH api/users/:id/remove
// @desc Remove an order from a user's orders
router.patch("/remove/:id", (req, res, next) => {
	User.findById(req.params.id)
		.then(user => {
			const orderId = req.body.order;
			if (user.orders.includes(orderId)) {
				user.orders = user.orders.filter(id => {
					return id != orderId;
				});
			}
			user.save()
				.then(user => res.json(user))
				.catch(err => console.log(err));
		})
		.catch(next);
});

module.exports = router;
