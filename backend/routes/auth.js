const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const router = express.Router();
const SECRET_KEY = "secret";

router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({ username, password: hashedPassword });
	res.json(user);
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ where: { username } });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
	res.json({ token });
});

module.exports = router;
