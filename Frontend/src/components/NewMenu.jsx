import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const templates = [
	{ id: "1", name: "Template 1" },
	{ id: "2", name: "Template 2" },
	{ id: "3", name: "Template 3" },
	{ id: "4", name: "Template 4" },
	{ id: "5", name: "Template 5" },
	{ id: "6", name: "Template 6" },
	{ id: "7", name: "Template 7" },
	{ id: "8", name: "Template 8" },
	{ id: "9", name: "Template 9" },
	{ id: "10", name: "Template 10" },
	{ id: "11", name: "Template 11" },
];

const NewMenu = () => {
	const [menuTitle, setMenuTitle] = useState("");
	const [menuTemplate, setMenuTemplate] = useState("");
	const [items, setItems] = useState([{ name: "", price: "", description: "" }]);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const storedTemplate = localStorage.getItem("selectedTemplate");
		if (storedTemplate) {
			setMenuTemplate(storedTemplate);
		}
	}, []);

	const handleChangeItem = (index, event) => {
		const values = [...items];
		values[index][event.target.name] = event.target.value;
		setItems(values);
	};

	const handleAddItem = () => {
		setItems([...items, { name: "", price: "", description: "" }]);
	};

	const handleRemoveItem = (index) => {
		const values = [...items];
		values.splice(index, 1);
		setItems(values);
	};

	const handleSubmit = async () => {
		setIsModalOpen(false); // Close the modal before submitting
		try {
			await axiosInstance.post("/menus", {
				title: menuTitle,
				template: menuTemplate,
				items,
			});
			setSuccess("Menu created successfully!");
			navigate("/dashboard");
			setError("");
			setMenuTitle("");
			setMenuTemplate("");
			setItems([{ name: "", price: "", description: "" }]);
		} catch (error) {
			setError("Failed to create menu.");
			setSuccess("");
		}
	};

	const openModal = (e) => {
		e.preventDefault(); // Prevent default form submission
		setIsModalOpen(true); // Open the modal
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
			<h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
				Create New Menu
			</h2>
			<form
				onSubmit={openModal}
				className="w-full max-w-lg space-y-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
			>
				<div>
					<label className="block text-sm sm:text-lg font-medium mb-1">Menu Title:</label>
					<input
						type="text"
						value={menuTitle}
						onChange={(e) => setMenuTitle(e.target.value)}
						required
						className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 text-sm sm:text-base"
					/>
				</div>
				<div>
					<label className="block text-sm sm:text-lg font-medium mb-1">Menu Template:</label>
					<select
						value={menuTemplate}
						onChange={(e) => setMenuTemplate(e.target.value)}
						required
						className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 text-sm sm:text-base"
					>
						<option value="">Confirm Your Template</option>
						{templates.map((template) => (
							<option key={template.id} value={template.id}>
								{template.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<h3 className="text-xl sm:text-2xl font-semibold mt-4">Menu Items:</h3>
					{items.map((item, index) => (
						<div
							key={index}
							className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-5 border border-gray-300 dark:border-gray-600 p-4 rounded-md bg-gray-50 dark:bg-gray-700 shadow-sm"
						>
							<div className="flex-1">
								<label className="block text-sm sm:text-md font-medium mb-1">Item Name:</label>
								<input
									type="text"
									name="name"
									value={item.name}
									onChange={(e) => handleChangeItem(index, e)}
									required
									className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 text-sm sm:text-base"
								/>
							</div>
							<div className="flex-1">
								<label className="block text-sm sm:text-md font-medium mb-1">Price:</label>
								<input
									type="number"
									name="price"
									value={item.price}
									onChange={(e) => handleChangeItem(index, e)}
									required
									className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 text-sm sm:text-base"
								/>
							</div>
							<div className="flex-1">
								<label className="block text-sm sm:text-md font-medium mb-1">Description:</label>
								<input
									type="text"
									name="description"
									value={item.description}
									onChange={(e) => handleChangeItem(index, e)}
									className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200 text-sm sm:text-base"
								/>
							</div>
							<button
								type="button"
								onClick={() => handleRemoveItem(index)}
								className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-200 mt-4 md:mt-0"
							>
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddItem}
						className="bg-green-500 text-white rounded-md p-3 hover:bg-green-600 transition duration-200 mt-4"
					>
						Add Item
					</button>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200 w-full"
				>
					Create Menu
				</button>
			</form>

			{error && <p className="text-red-500 mt-4 text-center">{error}</p>}
			{success && <p className="text-green-500 mt-4 text-center">{success}</p>}

			{/* Modal for confirmation */}
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
						<h3 className="text-lg font-semibold mb-4">Confirm Submission</h3>
						<p>Are you sure you want to create this menu?</p>
						<div className="mt-4 flex justify-end">
							<button
								className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-200 mr-2"
								onClick={() => setIsModalOpen(false)}
							>
								Cancel
							</button>
							<button
								className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition duration-200"
								onClick={handleSubmit}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default NewMenu;
