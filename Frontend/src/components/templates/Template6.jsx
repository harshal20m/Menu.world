import React from "react";

const Template6 = ({ menu }) => {
	if (!menu) {
		return <div className="text-gray-500">No menu found.</div>;
	}

	return (
		<div className="p-4 sm:p-6 bg-[#f4f4f4] rounded-lg max-w-4xl mx-auto shadow-lg overflow-hidden">
			<header className="bg-[#ff6b6b] text-white text-center rounded-t-xl py-6 sm:py-10 relative">
				<h1 className="text-3xl sm:text-4xl font-semibold tracking-widest capitalize">{menu.title}</h1>
				<div className="absolute inset-0 bg-radial-gradient animate-pulse"></div>
			</header>
			<div className="flex flex-wrap justify-center gap-4 sm:gap-6 bg-[#4ecdc4] p-4 rounded-b-xl mb-6">
				{Array.from({ length: 4 }, (_, index) => (
					<img
						key={index}
						src="/burger.jpeg"
						alt={`Signature Dish ${index + 1}`}
						className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-3 border-white transition-transform transform hover:scale-110"
					/>
				))}
			</div>
			<div className="grid">
				<div key={menu._id} className="menu-section p-4 relative">
					<h2 className="text-lg sm:text-xl font-semibold text-[#ff6b6b] mb-4 uppercase tracking-wider relative inline-block">
						{menu.title}
						<div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff6b6b] transform scale-x-0 transition-transform duration-300"></div>
					</h2>
					{menu.items.map((item) => (
						<div
							key={item._id}
							className="menu-item mb-4 sm:mb-6 transition-transform transform hover:translate-x-2"
						>
							<h3 className="text-md sm:text-lg font-normal text-[#333] flex justify-between items-baseline">
								{item.name} <span className="font-semibold text-[#4ecdc4]">rs.{item.price}</span>
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Template6;
