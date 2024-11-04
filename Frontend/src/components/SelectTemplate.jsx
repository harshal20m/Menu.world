// src/components/SelectTemplate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";
import Template6 from "./templates/Template6";
import Template7 from "./templates/Template7";
import Template8 from "./templates/Template8";
import Template9 from "./templates/Template9";
import Template11 from "./templates/Template11";

const templates = [
	{ id: 1, name: "Template 1", description: "A simple and clean layout.", component: Template1 },
	{ id: 2, name: "Template 2", description: "A colorful and vibrant design.", component: Template2 },
	{ id: 3, name: "Template 3", description: "Elegant and modern style.", component: Template3 },
	{ id: 4, name: "Template 4", description: "Classic and timeless.", component: Template4 },
	{ id: 5, name: "Template 5", description: "Sleek and minimal.", component: Template5 },
	{ id: 6, name: "Template 6", description: "Stylish and bold.", component: Template6 },
	{ id: 7, name: "Template 7", description: "Rustic and warm.", component: Template7 },
	{
		id: 8,
		name: "Template 8",
		description: "Modern and chic, note: images feature under development",
		component: Template8,
	},
	{ id: 9, name: "Template 9", description: "Vintage and cozy.", component: Template9 },
	{ id: 11, name: "Template 11", description: "Elegant and sophisticated.", component: Template11 },
];

const SelectTemplate = () => {
	const navigate = useNavigate();

	const dummyMenu = {
		_id: "1",
		title: "Cocktail Menu",
		items: [
			{ _id: "1", name: "Mojito", price: 1200, description: "A refreshing blend of rum, mint, and lime." },
			{
				_id: "2",
				name: "Margarita",
				price: 1400,
				description: "Tequila, lime juice, and orange liqueur, served with salt.",
			},
			{
				_id: "3",
				name: "Pina Colada",
				price: 1500,
				description: "A tropical mix of rum, coconut cream, and pineapple juice.",
			},
			{
				_id: "4",
				name: "Old Fashioned",
				price: 1600,
				description: "A classic cocktail with bourbon, sugar, and bitters.",
			},
		],
	};

	const handleSelect = (template) => {
		const token = localStorage.getItem("token"); // Check for token in local storage
		if (token) {
			localStorage.setItem("selectedTemplate", template.name);
			navigate("/create-menu");
		} else {
			alert("You need to log in to select a template."); // You can also redirect to login page
			navigate("/login"); // Optional: navigate to login page
		}
	};

	return (
		<div className="min-h-screen p-16 mt-5 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white ">
			<h2 className="text-4xl font-bold mb-6 text-center">Select a Template</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{templates.map((template) => (
					<div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
						<div className="mb-4 ">{React.createElement(template.component, { menu: dummyMenu })}</div>
						<h3 className="text-xl font-semibold">{template.name}</h3>
						<p className="text-gray-600 dark:text-gray-400">{template.description}</p>
						<button
							className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
							onClick={() => handleSelect(template)}
						>
							<i className="bx bx-select-multiple"></i> Select
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default SelectTemplate;
