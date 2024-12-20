// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://76ay0i6s6a.execute-api.us-east-1.amazonaws.com/api", // Change to your API's base URL
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
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle errors globally

		return Promise.reject(error);
	}
);

export default axiosInstance;
