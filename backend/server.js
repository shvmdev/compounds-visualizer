const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const compoundRoutes = require("./routes/compound");
const importCSV = require("./utils/importCSV"); // Ensure the correct path
const db = require("./models"); // Import Sequelize models

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/compounds", compoundRoutes);

// Function to import CSV on app start
const startApp = async () => {
	try {
		console.log("🔄 Syncing Database...");
		await db.sequelize.sync(); // Ensure database is initialized before import

		console.log("📂 Importing CSV data...");
		await importCSV();

		console.log("✅ CSV Imported Successfully!");
	} catch (error) {
		console.error("❌ Error during CSV import:", error);
	}
};

// Call function to import CSV on server start
startApp();

app.listen(5000, () => console.log("Server running on port 5000"));
