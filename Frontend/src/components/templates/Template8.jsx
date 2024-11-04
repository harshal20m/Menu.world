const Template8 = ({ menu }) => {
	if (!menu) {
		return <div className="text-gray-500">No menu found.</div>;
	}
	console.log(menu);

	return (
		<div className="p-6 bg-[#0a0a0a] rounded-lg max-w-5xl mx-auto shadow-lg">
			<header className="bg-[#ff4757] text-[#0a0a0a] text-center py-6 relative">
				<h1 className="text-2xl font-semibold tracking-wide capitalize">{menu.title}</h1>
			</header>

			<div key={menu._id} className=" bg-[#111] rounded-lg   transition-all duration-300 hover:bg-opacity-50">
				<h2 className="text-lg font-semibold text-[#ff4757] uppercase tracking-wider p-4 bg-[#1a1a1a]">
					Items
				</h2>
				<div className="p-4">
					{menu.items.map((item) => (
						<div
							key={item._id}
							className="menu-item flex items-center gap-2 w-full p-2 transition-transform transform hover:translate-x-1"
						>
							<img
								src="/burger.jpeg?height=60&width=60"
								alt={item.name}
								className="menu-item-image w-10 object-cover rounded-full border-2 border-[#ff4757] transition-transform transform hover:scale-110"
							/>
							<div className=" flex-grow">
								<h3 className="text-sm font-normal text-[#e0e0e0] flex justify-between items-baseline">
									{item.name} <span className="font-semibold text-[#5352ed]">rs.{item.price}</span>
								</h3>
								<p className="text-xs text-gray-400">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Template8;
