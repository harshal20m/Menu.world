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

			<div className="flex flex-wrap">
				<div key={menu._id} className="flex-1 m-2 bg-[#fffaf0] rounded-lg p-4 shadow-md">
					<h2 className="text-[#d35400] text-xl sm:text-2xl border-b-2 border-[#d35400] pb-2 mb-4">Items</h2>
					{menu.items.map((item) => (
						<div key={item._id} className="menu-item mb-4">
							<h3 className="text-md sm:text-lg font-semibold text-[#5c4b3e] flex justify-between items-baseline">
								{item.name} <span className="text-[#d35400] font-semibold">rs.{item.price}</span>
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
