const Menu = require("../models/menuModel");
const qrService = require("../services/generateQR");

exports.createMenu = async (req, res) => {
	try {
		const { title, template, items } = req.body;

		// Create menu document
		const menu = new Menu({
			owner: req.user.id,
			title, // Save the title
			template, // Save the template
			items,
		});

		// Generate QR code with public URL for menu
		const menuUrl = `https://menuworld.netlify.app/menus/${menu._id}`;
		const qrCodeBase64 = qrService.generateQRCode(menuUrl);

		// Save QR code to menu
		menu.qrCode = qrCodeBase64;

		// Save menu to database
		const savedMenu = await menu.save();
		res.status(201).json(savedMenu);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Fetch menus of a user
exports.getMenus = async (req, res) => {
	try {
		const menus = await Menu.find({ owner: req.user.id });
		res.json(menus);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get menu by ID
exports.getMenuById = async (req, res) => {
	try {
		const menu = await Menu.findById(req.params.id);
		if (!menu) return res.status(404).json({ message: "Menu not found" });
		res.json(menu);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete a menu
exports.deleteMenu = async (req, res) => {
	try {
		const menu = await Menu.findById(req.params.id);
		if (!menu) return res.status(404).json({ message: "Menu not found" });

		// Use menu.remove() or the alternative
		await Menu.deleteOne({ _id: req.params.id });
		// Alternatively, you can use:
		// await Menu.findByIdAndDelete(req.params.id);

		res.json({ message: "Menu deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//edit Menu
exports.editMenu = async (req, res) => {
	const { id } = req.params;
	const { title, template, items } = req.body;

	try {
		const menu = await Menu.findById(id);
		if (!menu) {
			return res.status(404).json({ message: "Menu not found" });
		}

		menu.title = title;
		menu.template = template;
		menu.items = items;

		await menu.save();
		res.status(200).json({ message: "Menu updated successfully", menu });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
