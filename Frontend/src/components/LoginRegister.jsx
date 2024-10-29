import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const LoginRegister = ({ onLogin }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({ username: "", email: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const endpoint = isLogin ? "/auth/login" : "/auth/register";
		try {
			const response = await axiosInstance.post(endpoint, formData);
			localStorage.setItem("token", response.data.token); // Store the token
			onLogin();
			navigate("/dashboard");
		} catch (error) {
			console.error(error.response.data);
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
					className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:bg-opacity-80 transition duration-200 font-semibold"
				>
					{isLogin ? "Login" : "Register"}
				</button>
			</form>
			<button
				onClick={() => setIsLogin(!isLogin)}
				className="mt-4 text-purple-500 hover:underline transition duration-200 text-sm"
			>
				Switch to {isLogin ? "Register" : "Login"}
			</button>
		</div>
	);
};

export default LoginRegister;
