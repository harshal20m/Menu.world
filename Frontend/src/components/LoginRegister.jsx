import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Modal = ({ message, onClose }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
				<h3 className="text-lg font-bold text-gray-800 dark:text-white">Error</h3>
				<p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
				<button
					onClick={onClose}
					className="mt-4 bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition duration-200"
				>
					Close
				</button>
			</div>
		</div>
	);
};

const LoginRegister = ({ onLogin }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({ username: "", email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(""); // Error state
	const [showModal, setShowModal] = useState(false); // Modal visibility state
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const endpoint = isLogin ? "/auth/login" : "/auth/register";
		setLoading(true);
		setError(""); // Reset error before each submission

		try {
			const response = await axiosInstance.post(endpoint, formData);
			localStorage.setItem("token", response.data.token);
			onLogin();
			navigate("/dashboard");
		} catch (error) {
			let errorMessage = "An error occurred. Please try again.";
			if (error.response) {
				// Customize error messages based on the response
				if (error.response.status === 401) {
					errorMessage = "Invalid email or password.";
				} else if (error.response.status === 400) {
					errorMessage = "Email is already registered.";
				} else if (error.response.status === 404) {
					errorMessage = "Email not found.";
				}
			}
			setError(errorMessage);
			setShowModal(true); // Show modal on error
		} finally {
			setLoading(false);
		}
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg p-8">
			<h2 className="text-4xl font-bold mb-6">{isLogin ? "Login" : "Register"}</h2>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full max-w-sm">
				{!isLogin && (
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
						required
						className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
					/>
				)}
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
					className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
					className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
				/>
				<button
					type="submit"
					className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:bg-opacity-80 transition duration-200 font-semibold flex justify-center items-center"
					disabled={loading}
				>
					{loading ? <span className="loader"></span> : isLogin ? "Login" : "Register"}
				</button>
			</form>
			<button
				onClick={() => setIsLogin(!isLogin)}
				className="mt-4 text-purple-500 hover:underline transition duration-200 text-sm"
			>
				Switch to {isLogin ? "Register" : "Login"}
			</button>
			{showModal && <Modal message={error} onClose={closeModal} />} {/* Modal for error messages */}
			<style>
				{`
					.loader {
						border: 2px solid transparent;
						border-top: 2px solid white;
						border-radius: 50%;
						width: 20px;
						height: 20px;
						animation: spin 0.6s linear infinite;
					}

					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
				`}
			</style>
		</div>
	);
};

export default LoginRegister;
