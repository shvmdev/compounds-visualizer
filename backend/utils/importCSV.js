const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { sequelize, Compound } = require("../models"); // ✅ Import `models/index.js`
// const Compound = db.Compound; // ✅ Get `Compound` model

const importCSV = async () => {
	const filePath = path.join(__dirname, "../data/compound.csv");

	// Ensure the model is defined before proceeding
	if (!Compound) {
		console.error("❌ Compound model is not loaded!");
		return;
	}
	try {
		const tableExists = await sequelize.getQueryInterface().showAllTables();
		if (!tableExists.includes("Compounds")) {
			console.log("Table 'compounds' does not exist. Skipping import.");
			return;
		}

		// ✅ Check if table has entries
		const count = await Compound.count();
		if (count > 0) {
			console.log("Table already has data. Skipping import.");
			return;
		}

		const results = [];

		fs.createReadStream(filePath)
			.pipe(csv())
			.on("data", (row) => {
				results.push({
					name: row.CompoundName,
					description: row.CompounrDescription, // ✅ Fixed spelling
					imageSource: row.strImageSource,
					imageAttribute: row.strImageAttribution,
					dateModified: row.dateModified,
				});
			})
			.on("end", async () => {
				try {
					await Compound.bulkCreate(results); // ✅ Efficient batch insert
					console.log("✅ CSV Import Completed!");
				} catch (err) {
					console.error("❌ Bulk Insert Error:", err);
				}
			})
			.on("error", (err) => console.error("❌ CSV Read Error:", err));
	} catch (error) {
		console.error("Error checking table", error);
	}
};
module.exports = importCSV;
