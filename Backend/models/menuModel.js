const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	title: { type: String, required: true }, // Existing title field
	template: { type: String, required: true }, // New field for menu template
	items: [
		{
			name: { type: String, required: true },
			price: { type: Number, required: true },
			description: { type: String },
		},
	],
	qrCode: { type: String }, // Field to store QR code in Base64 format
});

module.exports = mongoose.model("Menu", menuSchema);
