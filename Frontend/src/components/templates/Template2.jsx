const Template2 = ({ menu }) => {
	if (!menu) {
		return <div className="text-white">No menu found.</div>;
	}

	return (
		<div className="p-4 sm:p-6 bg-[#e6f3ff] rounded-lg max-w-5xl mx-auto">
			<h1 className="text-3xl sm:text-5xl text-center text-[#0077be] mb-6 sm:mb-10">{menu.title}</h1>

			<div key={menu._id} className="mb-10">
				<h2 className="text-[#0077be] text-2xl sm:text-3xl border-b-2 border-[#0077be] pb-2 mt-6 sm:mt-10">
					Items
				</h2>
				{menu.items.map((item) => (
					<div key={item._id} className="menu-item mb-4">
						<h3 className="text-lg sm:text-xl text-[#333] flex justify-between">
							{item.name}
							<span className="text-[#0077be] font-semibold">rs.{item.price}</span>
						</h3>
						<p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Template2;
