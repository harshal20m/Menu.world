import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-gray-300 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<div className="flex items-center space-x-2">
						<span className="text-2xl font-bold text-white">Menu.world</span>
						<span className="text-sm">© {currentYear} All rights reserved</span>
					</div>
					<nav className="flex space-x-4">
						<Link to="/about" className="hover:text-white transition duration-300">
							Terms
						</Link>
						<Link to="/about" className="hover:text-white transition duration-300">
							Privacy
						</Link>
						<a
							href="https://harshalmali.online"
							target="none"
							className="hover:text-white transition duration-300"
						>
							Contact
						</a>
					</nav>
					<div className="flex items-center space-x-4">
						<a
							href="https://harshalmali.online"
							target="_blank"
							rel="noopener noreferrer"
							className="group"
						>
							<span className="sr-only">Harshal Mali's website</span>
							<div className="bg-white text-gray-800 px-3 py-1 rounded-full font-bold group-hover:bg-blue-700 transition duration-300">
								&lt;HM&gt;
							</div>
						</a>
						<div className="flex space-x-2">
							<a
								href="https://github.com/harshal20m"
								target="none"
								className="text-gray-400 hover:text-white transition duration-300"
							>
								<i className="text-3xl bx bxl-github"></i>
							</a>
							<a
								href="https://www.instagram.com/20harshal/"
								target="none"
								className="text-gray-400 hover:text-white transition duration-300"
							>
								<i className="text-3xl  bx bxl-instagram-alt"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
