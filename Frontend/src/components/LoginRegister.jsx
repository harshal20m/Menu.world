import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const LoginRegister = ({ onLogin }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({ username: "", email: "", password: "" });
	const [loading, setLoading] = useState(false); // Loader state
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const endpoint = isLogin ? "/auth/login" : "/auth/register";
		setLoading(true); // Start loading
		try {
			const response = await axiosInstance.post(endpoint, formData);
			localStorage.setItem("token", response.data.token); // Store the token
			onLogin();
			navigate("/dashboard");
		} catch (error) {
			console.error(error.response.data);
		} finally {
			setLoading(false); // End loading
		}
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
					disabled={loading} // Disable the button while loading
				>
					{loading ? (
						<span className="loader"></span> // Custom loader component or style
					) : isLogin ? (
						"Login"
					) : (
						"Register"
					)}
				</button>
			</form>
			<button
				onClick={() => setIsLogin(!isLogin)}
				className="mt-4 text-purple-500 hover:underline transition duration-200 text-sm"
			>
				Switch to {isLogin ? "Register" : "Login"}
			</button>
			<style>
				{`
					.loader {
						border: 2px solid transparent;
						border-top: 2px solid white; /* Change this to the desired loader color */
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
