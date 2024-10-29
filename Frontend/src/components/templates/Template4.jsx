import React from "react";

const Template4 = ({ menu }) => {
	if (!menu) {
		return <div className="text-gray-500">No menu found.</div>;
	}

	return (
		<div className="p-4 sm:p-6 bg-[#fdf6e3] rounded-lg max-w-4xl mx-auto">
			<h1 className="text-3xl sm:text-5xl text-center text-[#5c4b3e] mb-6 sm:mb-10 font-serif shadow-lg capitalize">
				{menu.title}
			</h1>
			<div className="flex flex-wrap justify-center gap-4 sm:justify-around mb-6 bg-[#ffefd5] p-4 rounded-lg">
				<img
					src="/burger.jpeg"
					alt="Autumn Dish 1"
					className="w-24 sm:w-full min-w-[70px] max-w-[100px] sm:max-w-xs rounded-full border-4 border-[#d35400] object-cover m-2"
				/>
				<img
					src="/burger.jpeg"
					alt="Autumn Dish 2"
					className="w-24 sm:w-full min-w-[70px] max-w-[100px] sm:max-w-xs rounded-full border-4 border-[#d35400] object-cover m-2"
				/>
				<img
					src="/burger.jpeg?height=90&width=90"
					alt="Autumn Dish 3"
					className="w-24 sm:w-full min-w-[70px] max-w-[100px] sm:max-w-xs rounded-full border-4 border-[#d35400] object-cover m-2"
				/>
			</div>
			<div className="flex flex-wrap">
				<div key={menu._id} className="flex-1 m-2 bg-[#fffaf0] rounded-lg p-4 shadow-md">
					<h2 className="text-[#d35400] text-xl sm:text-2xl border-b-2 border-[#d35400] pb-2 mb-4">
						{menu.title}
					</h2>
					{menu.items.map((item) => (
						<div key={item._id} className="menu-item mb-4">
							<h3 className="text-md sm:text-lg font-semibold text-[#5c4b3e] flex justify-between items-baseline">
								{item.name}{" "}
								<span className="text-[#d35400] font-semibold">rs.{(item.price / 100).toFixed(2)}</span>
							</h3>
							<p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Template4;
