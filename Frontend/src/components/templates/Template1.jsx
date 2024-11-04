const Template1 = ({ menu }) => {
	if (!menu) {
		return <div className="text-gray-400">No menu found.</div>;
	}

	return (
		<div key={menu._id} className="mb-10 px-4 sm:px-8">
			<h1 className="text-3xl sm:text-5xl text-yellow-500 text-center mb-6 sm:mb-10">{menu.title}</h1>

			<h2 className="text-yellow-500 text-xl sm:text-2xl border-b border-yellow-500 pb-2 mt-6 sm:mt-10">items</h2>

			{menu.items.map((item) => (
				<div key={item._id} className="menu-item mb-4">
					<h3 className="text-yellow-500 text-lg sm:text-xl mb-1">
						{item.name} <span className="float-right text-yellow-500">rs.{item.price}</span>
					</h3>
					<p className="text-gray-400 text-sm sm:text-base">{item.description}</p>
				</div>
			))}
		</div>
	);
};

export default Template1;
