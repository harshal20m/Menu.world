// // src/components/Navbar.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({ isAuthenticated, onLogout }) => {
// 	const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
// 	const [isOpen, setIsOpen] = useState(false); // State to manage hamburger menu

// 	const toggleTheme = () => {
// 		const newTheme = theme === "light" ? "dark" : "light";
// 		setTheme(newTheme);
// 		localStorage.setItem("theme", newTheme);
// 		document.documentElement.className = newTheme; // Apply the theme to the document
// 	};

// 	useEffect(() => {
// 		document.documentElement.className = theme; // Set initial theme
// 	}, [theme]);

// 	const toggleMenu = () => {
// 		setIsOpen(!isOpen); // Toggle the menu
// 	};

// 	return (
// 		<nav className={`p-4 flex justify-between items-center ${theme === "light" ? "bg-gray-900" : "bg-gray-800"}`}>
// 			<Link className="text-gray-400 text-xl font-bold hover:text-white" to="/">
// 				Menu.world
// 			</Link>
// 			<div className="flex items-center">
// 				{/* Hamburger Button */}
// 				<button onClick={toggleMenu} className="block lg:hidden text-gray-400 hover:text-white">
// 					<i className={`bx ${isOpen ? "bx-x" : "bx-menu"}`} style={{ fontSize: "24px" }}></i>
// 				</button>
// 				{/* Navigation Links */}
// 				<div
// 					className={`absolute top-14 left-0 w-full rounded-b-3xl bg-gray-900 lg:static lg:flex lg:space-x-4 lg:bg-transparent ${
// 						isOpen ? "block" : "hidden"
// 					}`}
// 				>
// 					<Link className="block text-gray-400  hover:text-white px-4 py-2" to="/">
// 						Home
// 					</Link>
// 					{isAuthenticated ? (
// 						<>
// 							<Link className="block text-gray-400 hover:text-white px-4 py-2" to="/dashboard">
// 								Dashboard
// 							</Link>
// 							<button onClick={onLogout} className="block text-gray-400 hover:text-white px-4 py-2">
// 								Logout
// 							</button>
// 						</>
// 					) : (
// 						<Link className="block text-gray-400 hover:text-white px-4 py-2" to="/login">
// 							Login
// 						</Link>
// 					)}
// 					<Link className="block text-gray-400 hover:text-white px-4 py-2" to="/about">
// 						About Us
// 					</Link>
// 				</div>
// 				<button onClick={toggleTheme} className="flex items-center text-gray-400 hover:text-white ml-4">
// 					<i className={`bx ${theme === "light" ? "bx-sun" : "bx-moon"}`} style={{ fontSize: "24px" }}></i>
// 				</button>
// 			</div>
// 		</nav>
// 	);
// };

// export default Navbar;

// src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
	const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
	const [isOpen, setIsOpen] = useState(false); // State to manage hamburger menu

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.className = newTheme; // Apply the theme to the document
	};

	useEffect(() => {
		document.documentElement.className = theme; // Set initial theme
	}, [theme]);

	const toggleMenu = () => {
		setIsOpen(!isOpen); // Toggle the menu
	};

	const handleLinkClick = () => {
		setIsOpen(false); // Close the menu when a link is clicked
	};

	return (
		<nav
			className={`p-4 flex z-40 justify-between items-center ${
				theme === "light" ? "bg-gray-900" : "bg-gray-800"
			}`}
		>
			<Link className="text-gray-400 text-xl font-bold hover:text-white" to="/">
				Menu.world
			</Link>
			<div className="flex items-center">
				{/* Hamburger Button */}
				<button onClick={toggleMenu} className="block lg:hidden text-gray-400 hover:text-white">
					<i className={`bx ${isOpen ? "bx-x" : "bx-menu"}`} style={{ fontSize: "24px" }}></i>
				</button>
				{/* Navigation Links */}
				<div
					className={`absolute z-40 top-14 left-0 w-full rounded-b-3xl bg-gray-900 lg:static lg:flex lg:space-x-4 lg:bg-transparent ${
						isOpen ? "block" : "hidden"
					}`}
				>
					<Link className="block text-gray-400 hover:text-white px-4 py-2" to="/" onClick={handleLinkClick}>
						Home
					</Link>
					{isAuthenticated ? (
						<>
							<Link
								className="block text-gray-400 hover:text-white px-4 py-2"
								to="/dashboard"
								onClick={handleLinkClick}
							>
								Dashboard
							</Link>
							<button
								onClick={() => {
									onLogout();
									handleLinkClick();
								}}
								className="block text-gray-400 hover:text-white px-4 py-2"
							>
								Logout
							</button>
						</>
					) : (
						<Link
							className="block text-gray-400 hover:text-white px-4 py-2"
							to="/login"
							onClick={handleLinkClick}
						>
							Login
						</Link>
					)}
					<Link
						className="block text-gray-400 hover:text-white px-4 py-2"
						to="/about"
						onClick={handleLinkClick}
					>
						About Us
					</Link>
				</div>
				<button onClick={toggleTheme} className="flex items-center text-gray-400 hover:text-white ml-4">
					<i className={`bx ${theme === "light" ? "bx-sun" : "bx-moon"}`} style={{ fontSize: "24px" }}></i>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
