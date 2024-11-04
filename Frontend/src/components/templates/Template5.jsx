import React from "react";

const Template5 = ({ menu }) => {
	if (!menu) {
		return <div className="text-gray-500">No menu found.</div>;
	}

	return (
		<div className="p-4 sm:p-6 bg-[#f8f8f8] rounded-lg max-w-4xl mx-auto shadow-lg">
			<h1 className="text-3xl sm:text-4xl text-center text-[#333] mb-6 sm:mb-10 font-light tracking-wider capitalize">
				{menu.title}
			</h1>

			<div key={menu._id} className="p-4 border-b border-gray-200">
				<h2 className="text-lg sm:text-xl font-medium text-[#333] uppercase mb-4">Items</h2>
				{menu.items.map((item) => (
					<div key={item._id} className="mb-4 sm:mb-6">
						<h3 className="text-md sm:text-lg font-medium text-[#333] flex justify-between items-baseline">
							{item.name} <span className="font-bold">rs.{item.price}</span>
						</h3>
						<p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Template5;
