import { useState } from "react";

const menuSections = [
	{
		title: "Burger",
		items: [
			{ name: "Small Burger", price: "$5" },
			{ name: "Big Burger", price: "$7" },
			{ name: "Spicy Burger", price: "$6" },
		],
		image: "/burger.jpeg?height=200&width=200",
	},
	{
		title: "Pizza",
		items: [
			{ name: "Small Pizza", price: "$8" },
			{ name: "Big Pizza", price: "$10" },
			{ name: "Spicy Pizza", price: "$9" },
		],
		image: "/burger.jpeg?height=200&width=200",
	},
	{
		title: "Pasta",
		items: [
			{ name: "Small Pasta", price: "$6" },
			{ name: "Big Pasta", price: "$8" },
			{ name: "Spicy Pasta", price: "$7" },
		],
		image: "/burger.jpeg?height=200&width=200",
	},
	{
		title: "Salad",
		items: [
			{ name: "Small Salad", price: "$4" },
			{ name: "Large Salad", price: "$6" },
			{ name: "Special Salad", price: "$5" },
		],
		image: "/burger.jpeg?height=200&width=200",
	},
];

const themes = {
	lightOrange: {
		textColor: "text-orange-600",
		gradientBg: "bg-gradient-to-r from-orange-100 to-yellow-50",
		cardGradient: "bg-gradient-to-br from-orange-50 to-yellow-100",
	},
	lightBlue: {
		textColor: "text-blue-600",
		gradientBg: "bg-gradient-to-r from-blue-100 to-cyan-50",
		cardGradient: "bg-gradient-to-br from-blue-50 to-cyan-100",
	},
	lightGreen: {
		textColor: "text-green-600",
		gradientBg: "bg-gradient-to-r from-green-100 to-lime-50",
		cardGradient: "bg-gradient-to-br from-green-50 to-lime-100",
	},
	lightPurple: {
		textColor: "text-purple-600",
		gradientBg: "bg-gradient-to-r from-purple-100 to-pink-50",
		cardGradient: "bg-gradient-to-br from-purple-50 to-pink-100",
	},
};

export default function MenuPage() {
	const [selectedTheme, setSelectedTheme] = useState(themes.lightOrange);

	const handleThemeChange = (themeKey) => {
		setSelectedTheme(themes[themeKey]);
	};

	return (
		<div className={`${selectedTheme.gradientBg} min-h-screen p-3 sm:p-4 md:p-8`}>
			<div className="max-w-4xl mx-auto">
				{/* Theme Selection */}
				<div className="flex justify-center mb-6 sm:mb-8 md:mb-12 gap-4">
					{Object.keys(themes).map((themeKey) => (
						<div
							key={themeKey}
							className={`w-4 h-4 rounded-full cursor-pointer border-2 ${
								selectedTheme === themes[themeKey] ? "border-gray-600" : "border-transparent"
							}`}
							style={{
								backgroundImage: `linear-gradient(to right, ${
									themeKey === "lightOrange"
										? "#FFE4B2, #FFF5E1"
										: themeKey === "lightBlue"
										? "#B3E5FC, #E1F5FE"
										: themeKey === "lightGreen"
										? "#C8E6C9, #E8F5E9"
										: "#E1BEE7, #F3E5F5"
								})`,
							}}
							onClick={() => handleThemeChange(themeKey)}
						></div>
					))}
				</div>

				{/* Menu Title */}
				<h1
					className={`text-3xl sm:text-4xl md:text-6xl font-bold ${selectedTheme.textColor} text-center mb-6 sm:mb-8 md:mb-12`}
					style={{ fontFamily: "'Brush Script MT', cursive" }}
				>
					FOOD MENU
				</h1>

				{/* Menu Sections */}
				<div className="space-y-5 sm:space-y-6 md:space-y-8">
					{menuSections.map((section, index) => (
						<div
							key={section.title}
							className={`${selectedTheme.cardGradient} rounded-lg p-3 sm:p-5 md:p-6 border border-gray-300 shadow-lg transition-all duration-300 hover:shadow-xl`}
						>
							<div
								className={`flex ${
									index % 2 === 0 ? "flex-row" : "flex-row-reverse"
								} items-center gap-3 sm:gap-4 md:gap-6`}
							>
								<div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0">
									<div className="absolute inset-0 bg-opacity-20 blur-lg"></div>
									<div className="relative w-full h-full rounded-full border-2 border-opacity-30 overflow-hidden">
										<img src={section.image} alt={section.title} className="object-cover" />
									</div>
								</div>

								<div className="flex-1 w-full">
									<h2
										className={`text-xl sm:text-2xl md:text-3xl font-mono font-bold ${
											selectedTheme.textColor
										} mb-3 sm:mb-4 md:mb-6 text-center ${index % 2 !== 0 ? "text-left" : ""}`}
									>
										{section.title}
									</h2>
									<div className="space-y-1 sm:space-y-3 md:space-y-4">
										{section.items.map((item, itemIndex) => (
											<div
												key={itemIndex}
												className={`flex items-center justify-between gap-2 group ${
													index % 2 !== 0 ? "flex-row-reverse" : ""
												}`}
											>
												<div
													className={`flex-1 flex items-center gap-1 sm:gap-2 ${
														index % 2 !== 0 ? "flex-row-reverse" : ""
													}`}
												>
													<span className="text-sm font-mono sm:text-base md:text-lg text-zinc-800 group-hover:text-gray-700 transition-colors duration-200">
														{item.name}
													</span>
													<div className="border-b border-dotted border-gray-400 flex-1 group-hover:border-gray-500 transition-colors duration-200"></div>
												</div>
												<span className="text-sm font-mono sm:text-base md:text-lg font-bold ${selectedTheme.textColor}">
													{item.price}
												</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
