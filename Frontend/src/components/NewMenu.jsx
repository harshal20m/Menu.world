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
	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState({ name: "", price: "", description: "" });
	const [expandedItemIndex, setExpandedItemIndex] = useState(null); // Track expanded description
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const storedTemplate = localStorage.getItem("selectedTemplate");
		if (storedTemplate) {
			setMenuTemplate(storedTemplate);
		}
	}, []);

	const handleNewItemChange = (e) => {
		const { name, value } = e.target;
		setNewItem((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddItem = () => {
		if (!newItem.name || !newItem.price) {
			setError("Item name and price are required.");
			return;
		}
		setItems([...items, newItem]);
		setNewItem({ name: "", price: "", description: "" });
		setError("");
	};

	const handleRemoveItem = (index) => {
		const updatedItems = items.filter((_, i) => i !== index);
		setItems(updatedItems);
	};

	const toggleExpand = (index) => {
		setExpandedItemIndex(expandedItemIndex === index ? null : index);
	};

	const handleSubmit = async () => {
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
			setItems([]);
		} catch (error) {
			setError("Failed to create menu.");
			setSuccess("");
		}
	};

	return (
		<div className="flex flex-col mt-16 items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
			<h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400">
				Create New Menu
			</h2>
			<div className="w-full max-w-lg space-y-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
				<div>
					<label className="block text-sm sm:text-lg font-medium mb-1">Menu Title:</label>
					<input
						type="text"
						value={menuTitle}
						onChange={(e) => setMenuTitle(e.target.value)}
						required
						className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full"
					/>
				</div>
				<div>
					<label className="block text-sm sm:text-lg font-medium mb-1">Menu Template:</label>
					<select
						value={menuTemplate}
						onChange={(e) => setMenuTemplate(e.target.value)}
						required
						className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full"
					>
						<option value="">Select Template</option>
						{templates.map((template) => (
							<option key={template.id} value={template.id}>
								{template.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<h3 className="text-xl sm:text-2xl font-semibold mt-4">Add Menu Item:</h3>
					<div className="space-y-4">
						<input
							type="text"
							name="name"
							value={newItem.name}
							onChange={handleNewItemChange}
							placeholder="Item Name"
							required
							className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full"
						/>
						<input
							type="number"
							name="price"
							value={newItem.price}
							onChange={handleNewItemChange}
							placeholder="Price"
							required
							className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full"
						/>
						<input
							type="text"
							name="description"
							value={newItem.description}
							onChange={handleNewItemChange}
							placeholder="Description (Optional)"
							className="border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full"
						/>
						<button
							type="button"
							onClick={handleAddItem}
							className="bg-green-500 text-white rounded-md p-3 hover:bg-green-600 transition duration-200"
						>
							Add Item
						</button>
					</div>
				</div>
			</div>

			{/* Responsive Table */}
			<div className="w-full max-w-5xl mt-10">
				<h3 className="text-2xl sm:text-3xl text-center font-semibold mb-4">Menu Items</h3>
				<table className="table-auto w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-lg">
					<thead>
						<tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
							<th className="px-4 py-2">#</th>
							<th className="px-4 py-2">Item Name</th>
							<th className="px-4 py-2">Price</th>
							<th className="px-4 py-2 hidden sm:table-cell">Description</th>
							<th className="px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{(!items || items.length === 0) && (
							<tr>
								<td colSpan="5" className="text-center p-4 ">
									No items added yet!
								</td>
							</tr>
						)}

						{items.map((item, index) => (
							<>
								<tr key={index} className="text-center  text-sm ">
									<td className="border px-4 py-2">{index + 1}</td>
									<td className="border px-4 py-2">{item.name}</td>
									<td className="border px-4 py-2">{item.price}</td>
									<td className="border px-4 py-2 hidden sm:table-cell">{item.description}</td>
									<td className="border px-4 py-2 flex justify-center space-x-2">
										<button
											onClick={() => handleRemoveItem(index)}
											className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-200"
										>
											<i className="bx bxs-trash-alt"></i>
										</button>
										<button
											onClick={() => toggleExpand(index)}
											className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200 sm:hidden"
										>
											{expandedItemIndex === index ? "x" : <i className="bx bx-info-circle"></i>}
										</button>
									</td>
								</tr>
								{/* Expanded description row for mobile */}
								{expandedItemIndex === index && (
									<tr className="sm:hidden">
										<td colSpan="5" className="border px-4 py-2 text-left">
											<strong>Description:</strong>{" "}
											{item.description || "No description provided."}
										</td>
									</tr>
								)}
							</>
						))}
					</tbody>
				</table>
			</div>

			<button
				onClick={handleSubmit}
				className="mt-6 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
			>
				Save Menu
			</button>

			{error && <p className="text-red-500 mt-4 text-center">{error}</p>}
			{success && <p className="text-green-500 mt-4 text-center">{success}</p>}
		</div>
	);
};

export default NewMenu;
