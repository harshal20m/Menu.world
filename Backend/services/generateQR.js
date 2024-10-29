// services/qrService.js
const qr = require("qr-image");

exports.generateQRCode = (url) => {
	const qrBuffer = qr.imageSync(url, { type: "png" });
	return `data:image/png;base64,${qrBuffer.toString("base64")}`; // Convert to Base64 and return
};
