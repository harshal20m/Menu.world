const app = require("./app.js");
const serverless = require("serverless-http");

app.get("/", (req, res) => {
	return res.status(200).json({
		message: "Hello from the root!",
	});
});

app.use((req, res) => {
	return res.status(404).json({
		error: "Not Found",
	});
});

exports.handler = serverless(app);
