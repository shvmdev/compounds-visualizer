const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();
const SECRET_KEY = "secret";

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ where: { username } });
		if (existingUser) {
			return res.status(400).json({
				error: "Username already exists. Please choose a different one.",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const user = await User.create({ username, password: hashedPassword });

		console.log("New User Registered:", user);
		res.status(200).json(user);
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find user by username
		const user = await User.findOne({ where: { username } });

		// Check if user exists & password matches
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Generate JWT token (only include user ID & username)
		const token = jwt.sign(
			{ id: user.id, username: user.username }, // Removed `role`
			SECRET_KEY,
			{ expiresIn: "1h" }
		);

		// Send token in response
		res.json({ token });
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
