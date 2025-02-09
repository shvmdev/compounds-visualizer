const express = require("express");
const { Compound } = require("../models"); // ✅ Import model correctly

const router = express.Router();

// Get all compounds (with pagination)
router.get("/", async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = 10;
		const offset = (page - 1) * limit;
		const compounds = await Compound.findAndCountAll({ limit, offset });
		res.json(compounds);
	} catch (error) {
		console.error("Error fetching compounds:", error);
		res.status(500).json({ error: "Failed to retrieve compounds" });
	}
});

// Get single compound by ID
router.get("/:id", async (req, res) => {
	try {
		const compound = await Compound.findByPk(req.params.id);
		if (!compound) return res.status(404).json({ error: "Compound not found" });
		res.json(compound);
	} catch (error) {
		console.error("Error fetching compound:", error);
		res.status(500).json({ error: "Failed to retrieve compound" });
	}
});

// Update compound by ID
router.put("/:id", async (req, res) => {
	try {
		const [updated] = await Compound.update(req.body, {
			where: { id: req.params.id },
		});
		if (!updated) return res.status(404).json({ error: "Compound not found" });
		res.json({ message: "Updated successfully" });
	} catch (error) {
		console.error("Error updating compound:", error);
		res.status(500).json({ error: "Failed to update compound" });
	}
});

// Delete compound by ID
router.delete("/:id", async (req, res) => {
	try {
		const deleted = await Compound.destroy({ where: { id: req.params.id } });
		if (!deleted) return res.status(404).json({ error: "Compound not found" });
		res.json({ message: "Deleted successfully" });
	} catch (error) {
		console.error("Error deleting compound:", error);
		res.status(500).json({ error: "Failed to delete compound" });
	}
});

module.exports = router;
