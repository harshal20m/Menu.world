const styles = {
	container: {
		minHeight: "100vh",
		backgroundColor: "#FFF8E1",
		padding: "48px 16px",
		fontFamily: "Arial, sans-serif",
	},
	menu: {
		maxWidth: "800px",
		margin: "0 auto",
		backgroundColor: "#FFFFFF",
		borderRadius: "8px",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
		overflow: "hidden",
	},
	header: {
		backgroundColor: "#FFA000",
		padding: "24px 32px",
		color: "#FFFFFF",
		textAlign: "center",
	},
	title: {
		fontSize: "36px",
		fontWeight: "bold",
		margin: 0,
	},
	content: {
		padding: "32px",
	},
	category: {
		marginTop: "20px",
		borderBottom: "2px solid #FFA000",
		paddingBottom: "8px",
	},
	item: {
		marginBottom: "16px",
	},
	itemHeader: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "baseline",
	},
	itemName: {
		fontSize: "20px",
		fontWeight: "bold",
		color: "#5D4037",
		margin: 0,
	},
	itemPrice: {
		fontSize: "18px",
		fontWeight: "bold",
		color: "#FFA000",
	},
	itemDescription: {
		fontSize: "14px",
		color: "#6D4C41",
		margin: 0,
	},
	footer: {
		backgroundColor: "#FFF8E1",
		padding: "24px 32px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	footerText: {
		color: "#5D4037",
	},
	qrCode: {
		width: "80px",
		height: "80px",
		backgroundColor: "#FFFFFF",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		border: "1px solid #FFE082",
	},
};

export default function RestaurantMenu({ menu }) {
	if (!menu) {
		return <div>No menu found.</div>;
	}
	console.log(menu);
	return (
		<div key={menu._id} className="mb-10">
			<header style={styles.header}>
				<h1 className="capitalize" style={styles.title}>
					{menu.title}
				</h1>
			</header>
			<div style={styles.content}>
				<h2 style={{ ...styles.category, color: "#FFA000" }}>Items</h2>
				{menu.items.map((item) => (
					<div key={item._id} style={styles.item}>
						<div style={styles.itemHeader}>
							<h3 style={styles.itemName}>{item.name}</h3>
							<span style={styles.itemPrice}>rs.{item.price}</span>
						</div>
						<p style={styles.itemDescription}>{item.description}</p>
					</div>
				))}
			</div>
			<footer style={styles.footer}>
				<div style={styles.footerText}>
					<p style={{ fontWeight: "bold", margin: 0 }}>Scan for digital menu</p>
					<p style={{ fontSize: "14px", margin: "4px 0 0" }}>or visit our website</p>
				</div>
				<div style={styles.qrCode}>
					<img src={menu.qrCode} alt="" className="" />
				</div>
			</footer>
		</div>
	);
}
