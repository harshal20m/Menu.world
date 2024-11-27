import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
	const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
	const [isOpen, setIsOpen] = useState(false);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.className = newTheme;
	};

	useEffect(() => {
		document.documentElement.className = theme;
	}, [theme]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<nav className={`fixed top-0 left-0 right-0 z-50 ${theme === "light" ? "bg-white" : "bg-gray-900"} shadow-lg`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link
							className={`text-2xl font-bold ${
								theme === "light" ? "text-gray-900" : "text-white"
							} hover:text-indigo-500 transition duration-300`}
							to="/"
						>
							Menu.world
						</Link>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
						<NavLink to="/" theme={theme}>
							Home
						</NavLink>
						{isAuthenticated ? (
							<>
								<NavLink to="/dashboard" theme={theme}>
									Dashboard
								</NavLink>
								<button
									onClick={onLogout}
									className={`${
										theme === "light"
											? "text-gray-700 hover:text-gray-900"
											: "text-gray-300 hover:text-white"
									} px-3 py-2 rounded-md text-sm font-medium transition duration-300`}
								>
									Logout
								</button>
							</>
						) : (
							<NavLink to="/login" theme={theme}>
								Login
							</NavLink>
						)}
						<NavLink to="/about" theme={theme}>
							About Us
						</NavLink>
					</div>
					<div className="flex items-center  sm:ml-6">
						<button onClick={toggleTheme} className="dark:text-white pt-1" aria-label="Toggle theme">
							<i
								className={`bx ${theme === "light" ? "bxs-sun" : "bxs-moon"}`}
								style={{ fontSize: "20px" }}
							></i>
						</button>
						<div className="sm:hidden ml-3">
							<button
								onClick={toggleMenu}
								className={`inline-flex items-center justify-center p-2 rounded-md ${
									theme === "light"
										? "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
										: "text-gray-400 hover:text-white hover:bg-gray-700"
								} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300`}
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								<i className={`bx ${isOpen ? "bx-x" : "bx-menu"}`} style={{ fontSize: "24px" }}></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Mobile menu */}
			<div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
				<div className={`px-2 pt-2 pb-3 space-y-1 ${theme === "light" ? "bg-white" : "bg-gray-900"}`}>
					<MobileNavLink to="/" theme={theme} onClick={handleLinkClick}>
						Home
					</MobileNavLink>
					{isAuthenticated ? (
						<>
							<MobileNavLink to="/dashboard" theme={theme} onClick={handleLinkClick}>
								Dashboard
							</MobileNavLink>
							<button
								onClick={() => {
									onLogout();
									handleLinkClick();
								}}
								className={`block w-full text-left px-3 py-2  rounded-md text-base font-medium ${
									theme === "light"
										? "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
										: "text-gray-300 hover:text-white hover:bg-gray-700"
								} transition duration-300`}
							>
								Logout
							</button>
						</>
					) : (
						<MobileNavLink to="/login" theme={theme} onClick={handleLinkClick}>
							Login
						</MobileNavLink>
					)}
					<MobileNavLink to="/about" theme={theme} onClick={handleLinkClick}>
						About Us
					</MobileNavLink>
				</div>
			</div>
		</nav>
	);
};

const NavLink = ({ to, theme, children }) => (
	<Link
		to={to}
		className={`px-3 py-2 rounded-md text-sm font-medium ${
			theme === "light" ? "text-gray-700 hover:text-gray-900" : "text-gray-300 hover:text-white"
		} hover:bg-indigo-500 hover:text-white transition duration-300`}
	>
		{children}
	</Link>
);

const MobileNavLink = ({ to, theme, onClick, children }) => (
	<Link
		to={to}
		className={`block px-3 py-2 rounded-md text-base font-medium ${
			theme === "light"
				? "text-gray-700 hover:text-gray-900 hover:bg-gray-200"
				: "text-gray-300 hover:text-white hover:bg-gray-700"
		} transition duration-300`}
		onClick={onClick}
	>
		{children}
	</Link>
);

export default Navbar;
