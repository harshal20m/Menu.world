import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const EditMenu = () => {
	const { id } = useParams();
	const [menuTitle, setMenuTitle] = useState("");
	const [menuTemplate, setMenuTemplate] = useState("");
	const [items, setItems] = useState([{ name: "", price: "", description: "" }]);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await axiosInstance.get(`/menus/${id}`);
				const { title, template, items } = response.data;
				setMenuTitle(title);
				setMenuTemplate(template);
				setItems(items);
			} catch (error) {
				setError("Failed to fetch menu.");
			}
		};

		fetchMenu();
	}, [id]);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.put(`/menus/${id}`, {
				title: menuTitle,
				template: menuTemplate,
				items,
			});
			setSuccess("Menu updated successfully!");
			setError("");
		} catch (error) {
			setError("Failed to update menu.");
			setSuccess("");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
			<h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-600">Edit Menu</h2>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-lg space-y-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
			>
				<div>
					<label className="block text-sm sm:text-lg font-medium mb-1">Menu Title:</label>
					<input
						type="text"
						value={menuTitle}
						onChange={(e) => setMenuTitle(e.target.value)}
						required
						className="border text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
					/>
				</div>
				<div>
					<label className="block text-sm sm:text-lg font-medium mb-1">Menu Template:</label>
					<input
						type="text"
						value={menuTemplate}
						onChange={(e) => setMenuTemplate(e.target.value)}
						required
						className="border text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
					/>
				</div>
				<div>
					<h3 className="text-xl sm:text-2xl font-semibold mt-4">Menu Items:</h3>
					{items.map((item, index) => (
						<div
							key={index}
							className="flex flex-col space-y-3 mb-5 border border-gray-300 dark:border-gray-600 p-4 rounded-md bg-gray-50 dark:bg-gray-700 shadow-sm"
						>
							<div>
								<label className="block text-sm sm:text-md font-medium mb-1">Item Name:</label>
								<input
									type="text"
									name="name"
									value={item.name}
									onChange={(e) => handleChangeItem(index, e)}
									required
									className="border text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
								/>
							</div>
							<div>
								<label className="block text-sm sm:text-md font-medium mb-1">Price:</label>
								<input
									type="number"
									name="price"
									value={item.price}
									onChange={(e) => handleChangeItem(index, e)}
									required
									className="border text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
								/>
							</div>
							<div>
								<label className="block text-sm sm:text-md font-medium mb-1">Description:</label>
								<input
									type="text"
									name="description"
									value={item.description}
									onChange={(e) => handleChangeItem(index, e)}
									className="border text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 p-2 sm:p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
								/>
							</div>
							<button
								type="button"
								onClick={() => handleRemoveItem(index)}
								className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-200"
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
					Update Menu
				</button>
			</form>

			{error && <p className="text-red-500 mt-4 text-center">{error}</p>}
			{success && <p className="text-green-500 mt-4 text-center">{success}</p>}
		</div>
	);
};

export default EditMenu;
