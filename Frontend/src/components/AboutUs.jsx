import { useState } from "react";
import emailjs from "emailjs-com";

const AboutUs = () => {
	const [feedback, setFeedback] = useState("");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);
		setError("");

		emailjs
			.send(
				`${import.meta.env.VITE_EMAILJS_USER_ID}`,
				`${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
				{ message: feedback, name, date: new Date().toLocaleString() },
				`${import.meta.env.VITE_EMAILJS_PUBLIC_ID}`
			)
			.then(
				() => {
					setSuccess(true);
					setFeedback("");
					setName("");
				},
				() => {
					setError("Failed to send feedback. Please try again.");
				}
			)
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="container bg-white dark:bg-gray-900 mt-16 mx-auto px-4 py-8 max-w-4xl">
			<h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">About Us</h1>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
				<div className="p-6">
					<p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
						Welcome to Menu.Online, your go-to solution for creating and managing digital menus. Our
						platform is designed to simplify the dining experience for both customers and restaurant owners.
						With our user-friendly interface, you can easily create, customize, and share your menus online.
					</p>
					<p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
						Our mission is to empower restaurants with the tools they need to thrive in the digital age. We
						believe that every restaurant deserves a beautiful and functional online presence. Our team is
						dedicated to providing exceptional service and support to help you achieve your goals.
					</p>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
				<div className="p-6">
					<p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
						Thank you for choosing Menu.World! If you have any questions or feedback, feel free to contact
						us at <br />
						<a
							href="mailto:20harshalmali@gmail.com"
							className="text-center text-blue-600 dark:text-blue-400 hover:underline"
						>
							20harshalmali@gmail.com
						</a>
						.
					</p>
				</div>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
				<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">We Value Your Feedback</h2>
				</div>
				<div className="p-6">
					{success ? (
						<div className="fade-in h-48 mt-7 flex flex-col justify-center items-center text-center">
							<p className="text-2xl text-center font-semibold text-green-500">
								Thank you for your feedback!
							</p>
							<i className="bx block bx-badge-check text-8xl text-green-400 bx-tada pt-5"></i>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-4">
							<input
								type="text"
								placeholder="Your Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full bg-white px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
							/>
							<textarea
								placeholder="Your feedback..."
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
								required
								className="w-full bg-white px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white min-h-[100px]"
							/>
							<div className="flex justify-end">
								<button
									type="submit"
									disabled={loading}
									className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{loading ? "Sending..." : "Send Feedback"}
								</button>
							</div>
							{error && <p className="text-red-500 mt-2">{error}</p>}
						</form>
					)}
				</div>
			</div>

			<style>{`
				.fade-in {
					animation: fadeIn 1s ease-in-out forwards;
				}
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
};

export default AboutUs;
