const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Function to create a JWT token
exports.generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Function to verify a token
exports.verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

// Function to hash a password
exports.hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

// Function to check a password
exports.comparePassword = async (enteredPassword, storedPassword) => {
	return await bcrypt.compare(enteredPassword, storedPassword);
};
