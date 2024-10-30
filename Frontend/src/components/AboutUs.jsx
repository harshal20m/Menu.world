// src/pages/AboutUs.jsx
import React, { useState } from "react";
import emailjs from "emailjs-com";

const AboutUs = () => {
	const [feedback, setFeedback] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleFeedbackChange = (e) => {
		setFeedback(e.target.value);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);
		setError("");

		// Use your EmailJS user ID, service ID, and template ID
		emailjs
			.send(
				"service_p8wr0oh",
				"template_qi4jmrd",
				{ message: feedback, name, date: new Date().toLocaleString() },
				"r3yBJf8U40GHRlhXb"
			)
			.then(
				(result) => {
					setSuccess(true);
					setFeedback("");
					setName("");
				},
				(error) => {
					setError("Failed to send feedback. Please try again.");
				}
			)
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
			<h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">About Us</h1>

			<p className="text-lg text-gray-600 dark:text-gray-400 mb-4 text-center max-w-2xl">
				Welcome to Menu.Online, your go-to solution for creating and managing digital menus. Our platform is
				designed to simplify the dining experience for both customers and restaurant owners. With our
				user-friendly interface, you can easily create, customize, and share your menus online.
			</p>
			<p className="text-lg text-gray-600 dark:text-gray-400 mb-4 text-center max-w-2xl">
				Our mission is to empower restaurants with the tools they need to thrive in the digital age. We believe
				that every restaurant deserves a beautiful and functional online presence. Our team is dedicated to
				providing exceptional service and support to help you achieve your goals.
			</p>
			{/* Image Section */}
			<div className="my-4 ">
				<img
					src="/text.png" // Replace with your desired image URL
					alt="About Us"
					className="w-15 h-10 "
				/>
			</div>
			<p className="text-lg text-gray-600 dark:text-gray-400 mb-4 text-center max-w-2xl">
				Thank you for choosing Menu.World! If you have any questions or feedback, feel free to contact us on
				<span href="mailto:" className="text-blue-600 dark:text-blue-400 cursor-pointer">
					{" "}
					20harshalmali@gmail.com
				</span>
				.
			</p>
			{/* Feedback Section */}
			<h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mt-8 mb-4">
				We Value Your Feedback / Suggestions
			</h2>
			<form
				onSubmit={handleSubmit}
				className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md w-full max-w-md"
			>
				<input
					type="text"
					className="w-full p-2 border   bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 rounded mb-2"
					placeholder="Your Name"
					value={name}
					onChange={handleNameChange}
					required
				/>
				<textarea
					className="w-full p-2 border   bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 rounded mb-2"
					rows="4"
					placeholder="Your feedback..."
					value={feedback}
					onChange={handleFeedbackChange}
					required
				/>
				<div className="flex justify-end">
					<button
						type="submit"
						className="bg-blue-500 rounded-2xl text-white px-4 py-2   hover:bg-blue-600"
						disabled={loading}
					>
						{loading ? "Sending..." : "Send Feedback"}
					</button>
				</div>
				{success && <p className="text-green-500 mt-2">Feedback sent successfully!</p>}
				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
		</div>
	);
};

export default AboutUs;
