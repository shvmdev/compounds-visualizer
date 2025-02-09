const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config(); // Load environment variables

// Load the config file dynamically
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
	env
];

// ✅ Use environment variables if available, otherwise use `config.json`
const sequelize = new Sequelize(
	process.env.DB_NAME || config.database,
	process.env.DB_USER || config.username,
	process.env.DB_PASSWORD || config.password,
	{
		host: process.env.DB_HOST || config.host,
		dialect: config.dialect,
		logging: config.logging ? console.log : false, // Enable logging only if set in config
		pool: {
			max: 10,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

// ✅ Check if the connection is successful
sequelize
	.authenticate()
	.then(() => console.log("✅ Database connected successfully!"))
	.catch((err) => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
