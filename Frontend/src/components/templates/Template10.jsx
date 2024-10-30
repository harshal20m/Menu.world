const Template10 = ({ menu }) => {
	const listStyles = {
		container: {
			minHeight: "80vh",
			backgroundColor: "#FFF3E0",
			padding: "40px 20px",
			fontFamily: "Tahoma, sans-serif",
		},
		menu: {
			maxWidth: "700px",
			margin: "0 auto",
			padding: "20px",
			borderRadius: "8px",
			backgroundColor: "#FFFFFF",
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
		},
		header: {
			backgroundColor: "#FF7043",
			padding: "20px",
			color: "#FFFFFF",
			textAlign: "center",
			borderRadius: "8px 8px 0 0",
		},
		title: {
			fontSize: "32px",
			margin: 0,
		},
		content: {
			padding: "20px",
		},
		item: {
			marginBottom: "15px",
			padding: "15px",
			backgroundColor: "#FFCCBC",
			borderRadius: "5px",
		},
		itemName: {
			fontSize: "24px",
			fontWeight: "bold",
			color: "#BF360C",
		},
		itemPrice: {
			color: "#D84315",
		},
	};

	if (!menu) {
		return <div>No menu found.</div>;
	}

	return (
		<div key={menu._id} style={listStyles.menu}>
			<header style={listStyles.header}>
				<h1 style={listStyles.title}>{menu.title}</h1>
			</header>
			<div style={listStyles.content}>
				{menu.items.map((item) => (
					<div className="flex flex-row justify-between" key={item._id} style={listStyles.item}>
						<div className="flex flex-col">
							<h3 style={listStyles.itemName}>{item.name}</h3>
							<span style={listStyles.itemPrice} className="text-xs">
								rs.{item.price}
							</span>
						</div>
						<div className="font-serif">
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Template10;
