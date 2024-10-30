const Template9 = ({ menu }) => {
	const cardStyles = {
		container: {
			minHeight: "80vh",
			backgroundColor: "#E0F7FA",
			padding: "48px 16px",
			fontFamily: "Verdana, sans-serif",
		},
		menuCard: {
			maxWidth: "600px",
			margin: "20px auto",
			backgroundColor: "#FFFFFF",
			borderRadius: "12px",
			boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
			overflow: "hidden",
		},
		header: {
			backgroundColor: "#00796B",
			padding: "20px",
			color: "#FFFFFF",
			textAlign: "center",
			borderTopLeftRadius: "12px",
			borderTopRightRadius: "12px",
		},
		title: {
			fontSize: "28px",
			margin: 0,
		},
		content: {
			padding: "20px",
		},
		category: {
			marginTop: "15px",
			fontWeight: "bold",
			color: "#004D40",
			fontSize: "18px",
		},
		item: {
			marginBottom: "10px",
			borderBottom: "1px solid #B2DFDB",
			paddingBottom: "10px",
		},
		itemName: {
			fontSize: "22px",
			fontWeight: "bold",
			color: "#00796B",
		},
		itemPrice: {
			fontSize: "18px",
			color: "#FF5722",
		},
		footer: {
			backgroundColor: "#E0F2F1",
			padding: "15px",
			textAlign: "center",
		},
	};

	if (!menu) {
		return <div>No menu found.</div>;
	}

	return (
		<div key={menu._id} style={cardStyles.menuCard}>
			<header style={cardStyles.header}>
				<h1 style={cardStyles.title}>{menu.title}</h1>
			</header>
			<div style={cardStyles.content}>
				{menu.items.map((item) => (
					<div className="flex flex-row justify-between" key={item._id} style={cardStyles.item}>
						<div className="flex flex-col">
							<h3 style={cardStyles.itemName}>{item.name}</h3>
							<span style={cardStyles.itemPrice} className="text-xs">
								rs.{item.price}
							</span>
						</div>
						<div className="font-serif">
							<p className="text-gray-600">{item.description}</p>
						</div>
					</div>
				))}
			</div>
			<footer style={cardStyles.footer}>
				<img className="mx-auto p-4 text-green-500" src={menu.qrCode} alt="QR" />

				<p className="text-green-700">Scan QR Code for details!</p>
			</footer>
		</div>
	);
};

export default Template9;
