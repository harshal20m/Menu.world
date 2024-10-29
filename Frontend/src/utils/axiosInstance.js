// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://menu-world.onrender.com/api", // Change to your API's base URL
	timeout: 10000, // Set a timeout for requests
});

// Optional: Interceptors for handling requests and responses
axiosInstance.interceptors.request.use(
	(config) => {
		// You can add authorization headers or any other config here
		const token = localStorage.getItem("token"); // Example of retrieving a token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.log("token nhi mila");
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle errors globally
		console.error("API call error:", error);
		return Promise.reject(error);
	}
);

export default axiosInstance;
