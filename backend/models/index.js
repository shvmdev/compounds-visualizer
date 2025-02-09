"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // ✅ Use centralized DB config

const db = {};
const basename = path.basename(__filename);

// ✅ Dynamically read model files
fs.readdirSync(__dirname)
	.filter((file) => file.endsWith(".js") && file !== basename)
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, DataTypes);
		db[model.name] = model;
	});

// ✅ Apply associations if they exist
Object.values(db).forEach((model) => {
	if (model.associate) {
		model.associate(db);
	}
});

// ✅ Attach Sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
