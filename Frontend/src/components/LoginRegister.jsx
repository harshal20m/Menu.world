import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const LoginRegister = ({ onLogin }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({ username: "", email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const endpoint = isLogin ? "/auth/login" : "/auth/register";
		setLoading(true);
		try {
			const response = await axiosInstance.post(endpoint, formData);
			localStorage.setItem("token", response.data.token);
			onLogin();
			navigate("/dashboard");
		} catch (error) {
			console.error(error.response.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
			<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
				<div className="p-8">
					<h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
						{isLogin ? "Welcome Back" : "Create Account"}
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						{!isLogin && (
							<div>
								<label
									htmlFor="username"
									className="block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Username
								</label>
								<input
									id="username"
									type="text"
									name="username"
									required
									value={formData.username}
									onChange={handleChange}
									className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						)}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Email address
							</label>
							<input
								id="email"
								type="email"
								name="email"
								required
								value={formData.email}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								name="password"
								required
								value={formData.password}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<div>
							<button
								type="submit"
								disabled={loading}
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
							>
								{loading ? (
									<svg
										className="animate-spin h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								) : isLogin ? (
									"Sign In"
								) : (
									"Create Account"
								)}
							</button>
						</div>
					</form>
				</div>
				<div className="px-8 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600">
					<p className="text-xs text-center text-gray-600 dark:text-gray-400">
						{isLogin ? "Don't have an account?" : "Already have an account?"}
						<button
							onClick={() => setIsLogin(!isLogin)}
							className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 ml-1 focus:outline-none focus:underline transition ease-in-out duration-150"
						>
							{isLogin ? "Sign up" : "Sign in"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginRegister;
