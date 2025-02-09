const { Sequelize } = require("sequelize");
const path = require("path");

// Load the config file dynamically
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "..", "config", "config.json"))[
	env
];

// ✅ Initialize Sequelize using config.json values
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,
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
