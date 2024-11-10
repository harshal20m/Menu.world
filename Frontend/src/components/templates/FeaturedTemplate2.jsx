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
];

export default function TabbedMenu() {
	const [activeTab, setActiveTab] = useState(menuSections[0].title);

	return (
		<div className=" bg-gray-900 p-4 sm:p-6 md:p-8 text-gray-100">
			<div className="max-w-4xl mx-auto">
				<h1
					className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 text-center mb-8 sm:mb-12"
					style={{ fontFamily: "'Brush Script MT', cursive" }}
				>
					PRO MENU
				</h1>

				{/* Tab Navigation */}
				<div className="flex space-x-4 sm:space-x-6 justify-center mb-8 border-b border-orange-500/30">
					{menuSections.map((section) => (
						<button
							key={section.title}
							onClick={() => setActiveTab(section.title)}
							className={`px-4 py-2 sm:px-6 text-sm sm:text-base font-semibold ${
								activeTab === section.title
									? "text-orange-500 border-b-2 border-orange-500"
									: "text-gray-400 hover:text-orange-500"
							} transition-colors duration-300`}
						>
							{section.title}
						</button>
					))}
				</div>

				{/* Menu Content */}
				<div className="mt-6 sm:mt-8">
					{menuSections.map(
						(section) =>
							activeTab === section.title && (
								<div key={section.title} className="space-y-6 sm:space-y-8">
									<div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-orange-500/20 shadow-lg shadow-orange-500/10">
										<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
											{/* Category Image */}
											<div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
												<div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 blur-lg"></div>
												<div className="relative w-full h-full rounded-full border-2 border-orange-500 overflow-hidden">
													<img
														src={section.image}
														alt={section.title}
														className="object-cover"
													/>
												</div>
											</div>

											{/* Menu Items */}
											<div className="flex-1 w-full">
												<h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-4 sm:mb-6">
													{section.title}
												</h2>
												<div className="space-y-2 sm:space-y-4">
													{section.items.map((item, itemIndex) => (
														<div
															key={itemIndex}
															className="flex items-center justify-between gap-2 group"
														>
															<div className="flex-1 flex items-center gap-2">
																<span className="text-base sm:text-lg text-gray-100 group-hover:text-orange-500 transition-colors duration-200">
																	{item.name}
																</span>
																<div className="border-b border-dotted border-gray-700 flex-1 group-hover:border-orange-500/50 transition-colors duration-200"></div>
															</div>
															<span className="text-base sm:text-lg font-bold text-orange-500">
																{item.price}
															</span>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							)
					)}
				</div>
			</div>
		</div>
	);
}
