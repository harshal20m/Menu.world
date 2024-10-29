import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Palette, Zap, Layout } from "lucide-react";

export default function Home({ isAuthenticated = false }) {
	const handleCreateMenu = () => {
		window.location.href = isAuthenticated ? "/create-menu" : "/login";
	};

	const handleExploreTemplates = () => {
		window.location.href = "/explore";
	};

	useEffect(() => {
		document.body.classList.toggle("dark", localStorage.getItem("theme") === "dark");
	}, []);

	return (
		<div
			className={`relative  sm:h-[92vh] overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100`}
		>
			<motion.div className="absolute inset-0 z-0">
				{[...Array(100)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-blue-500 rounded-full"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
						}}
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
						transition={{
							duration: Math.random() * 3 + 2,
							repeat: Infinity,
							repeatType: "loop",
							ease: "easeInOut",
							delay: Math.random() * 2,
						}}
					/>
				))}
			</motion.div>

			<motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
				<motion.div
					className="text-center mb-10"
					initial={{ y: -50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
						Create Your Perfect Menu
					</h1>
					<p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400">
						Design and customize your menu easily!
					</p>
				</motion.div>

				<motion.div
					className="flex flex-col sm:flex-row gap-4 z-10 mb-12"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<button
						onClick={handleCreateMenu}
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
					>
						Create Menu <ArrowRight className="ml-2 h-4 w-4 inline" />
					</button>
					<button
						onClick={handleExploreTemplates}
						className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold py-2 px-4 rounded-lg"
					>
						Explore Templates
					</button>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<FeatureCard
						icon={<Palette className="h-8 w-8 text-purple-500" />}
						title="Customizable Designs"
						description="Choose from a variety of styles and customize to your liking."
					/>
					<FeatureCard
						icon={<Zap className="h-8 w-8 text-yellow-500" />}
						title="Quick and Easy"
						description="Create professional menus in minutes, not hours."
					/>
					<FeatureCard
						icon={<Layout className="h-8 w-8 text-green-500" />}
						title="Flexible Layouts"
						description="Adapt your menu to any format or device with ease."
					/>
				</motion.div>
			</motion.div>
		</div>
	);
}

function FeatureCard({ icon, title, description }) {
	return (
		<div className="overflow-hidden border rounded-lg shadow-md">
			<div className="p-6">
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="flex flex-col items-center text-center"
				>
					{icon}
					<h3 className="mt-4 mb-2 text-lg font-semibold">{title}</h3>
					<p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
				</motion.div>
			</div>
		</div>
	);
}
