import React from "react";

const Template7 = ({ menu }) => {
	if (!menu) {
		return <div className="text-gray-500">No menu found.</div>;
	}

	return (
		<div className="p-6 bg-[#121212] rounded-lg max-w-3xl mx-auto shadow-lg overflow-hidden">
			<header className="bg-[#ff6b6b] text-[#121212] text-center py-8 rounded-t-lg relative">
				<h1 className="text-3xl font-semibold tracking-widest capitalize">{menu.title}</h1>
				<div className="absolute inset-0 bg-radial-gradient animate-pulse"></div>
			</header>
			<div className="flex justify-between bg-[#222] p-4 rounded-lg mb-6 relative">
				{Array.from({ length: 4 }, (_, index) => (
					<img
						key={index}
						src="/burger.jpeg?height=80&width=80"
						alt={`Signature Dish ${index + 1}`}
						className="w-20 h-20 object-cover rounded-full border-2 border-[#ff6b6b] transition-transform transform hover:scale-110 shadow-md"
					/>
				))}
			</div>
			<div className="grid gap-6">
				<div
					key={menu._id}
					className="menu-section p-4 relative bg-[#1a1a1a] rounded-lg transition-all duration-300 hover:bg-opacity-50"
				>
					<h2 className="text-xl font-semibold text-[#ff6b6b] mb-4 uppercase tracking-wider relative inline-block">
						{menu.title}
						<div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff6b6b] transform scale-x-0 transition-transform duration-300"></div>
					</h2>
					{menu.items.map((item) => (
						<div
							key={item._id}
							className="menu-item mb-4 transition-transform transform hover:translate-x-2"
						>
							<h3 className="text-lg font-normal text-[#e0e0e0] flex justify-between items-baseline">
								{item.name}{" "}
								<span className="font-semibold text-[#4ecdc4]">rs.{(item.price / 100).toFixed(2)}</span>
							</h3>
							<p className="text-gray-400">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Template7;
