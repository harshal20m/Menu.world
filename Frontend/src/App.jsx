// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import NewMenu from "./components/NewMenu";
import EditMenu from "./components/EditMenu";
import SelectTemplate from "./components/SelectTemplate";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import MenuPage from "./components/MenuPage";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // State to manage loading
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
		setIsLoading(false); // Stop loading once authentication check is complete
	}, []);

	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<div>
			<Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
			<Routes>
				<Route path="/menus/:id" element={<MenuPage />} />
				<Route path="/edit/:id" element={<EditMenu />} />
				<Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
				<Route path="/create-menu" element={<NewMenu />} />
				<Route path="/explore" element={<SelectTemplate />} />
				<Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/about" element={<AboutUs />} />
			</Routes>

			<Footer />
		</div>
	);
};

export default App;
