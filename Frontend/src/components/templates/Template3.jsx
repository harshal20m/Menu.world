import React from "react";

const Template3 = ({ menu }) => {
	if (!menu) {
		return <div className="text-white">No menus found.</div>;
	}

	return (
		<div className="p-4 sm:p-6 bg-[#e6f3ff] rounded-lg max-w-5xl mx-auto">
			<h1 className="text-3xl sm:text-5xl text-center text-[#0077be] mb-6 sm:mb-10">Ocean Breeze Restaurant</h1>
			<div className="flex flex-wrap justify-center gap-4 sm:justify-between mb-6">
				<img
					src="/burger.jpeg"
					alt="Appetizer"
					className="w-24 sm:w-full m-2 sm:m-3 min-w-[70px] max-w-[100px] sm:max-w-xs rounded-md border-2 border-[#0077be] object-cover"
				/>
				<img
					src="/burger.jpeg"
					alt="Main Course"
					className="w-24 sm:w-full m-2 sm:m-3 min-w-[70px] max-w-[100px] sm:max-w-xs rounded-md border-2 border-[#0077be] object-cover"
				/>
				<img
					src="/burger.jpeg"
					alt="Dessert"
					className="w-24 sm:w-full m-2 sm:m-3 min-w-[70px] max-w-[100px] sm:max-w-xs rounded-md border-2 border-[#0077be] object-cover"
				/>
			</div>
			<div>
				<div key={menu._id} className="bg-[#f9fbf7] border border-[#d0e0c5] rounded-lg p-4">
					<h2 className="text-[#0077be] text-xl sm:text-2xl border-b-2 border-[#0077be] pb-2 mb-4">
						{menu.title}
					</h2>
					{menu.items.map((item) => (
						<div key={item._id} className="menu-item mb-4">
							<h3 className="text-md sm:text-lg font-semibold text-[#333] flex justify-between">
								{item.name}
								<span className="text-[#0077be] font-semibold">rs.{(item.price / 100).toFixed(2)}</span>
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Template3;
