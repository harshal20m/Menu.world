import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";

const MyMenu = () => {
	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [qrSettings, setQrSettings] = useState({
		title: "",
		date: "",
		contact: "",
		backgroundColor: "#ffffff",
	});
	const [selectedMenu, setSelectedMenu] = useState(null);

	useEffect(() => {
		const fetchMenus = async () => {
			try {
				const response = await axiosInstance.get("/menus");
				setMenus(response.data);
			} catch (error) {
				setError("Failed to fetch menus.");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchMenus();
	}, []);

	const handleDeleteMenu = async (id) => {
		if (window.confirm("Are you sure you want to delete this menu?")) {
			try {
				await axiosInstance.delete(`/menus/${id}`);
				setMenus(menus.filter((menu) => menu._id !== id));
			} catch (error) {
				setError("Failed to delete menu.");
				console.error(error);
			}
		}
	};

	const openModal = (menu) => {
		setSelectedMenu(menu);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setQrSettings({ title: "", date: "", contact: "", backgroundColor: "#ffffff" });
	};

	const handleDownload = () => {
		const { title, date, contact, backgroundColor } = qrSettings;
		downloadQr(selectedMenu.qrCode, title, date, contact, backgroundColor, selectedMenu.title);
		closeModal();
	};

	const downloadQr = (qrCode, title, date, contact, backgroundColor, originalTitle) => {
		const link = document.createElement("a");
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		const img = new Image();
		img.src = qrCode;

		img.onload = () => {
			const finalTitle = title || originalTitle;
			canvas.width = img.width + 80;
			canvas.height = img.height + 220; // Additional space for footer text
			context.fillStyle = backgroundColor;
			context.fillRect(0, 0, canvas.width, canvas.height);

			// Center title text above QR code
			context.font = "20px Arial";
			context.fillStyle = "#000000";
			if (finalTitle) {
				const titleWidth = context.measureText(finalTitle).width;
				context.fillText(finalTitle, (canvas.width - titleWidth) / 2, 30);
			}

			// Draw the QR code centered on the canvas
			context.drawImage(img, (canvas.width - img.width) / 2, 60);

			// Center additional text fields
			context.font = "16px Arial"; // Change font size as needed
			if (date) {
				const dateText = `Date: ${date}`;
				const dateWidth = context.measureText(dateText).width;
				context.fillText(dateText, (canvas.width - dateWidth) / 2, img.height + 110);
			}
			if (contact) {
				const contactText = `Contact: ${contact}`;
				const contactWidth = context.measureText(contactText).width;
				context.fillText(contactText, (canvas.width - contactWidth) / 2, img.height + 140);
			}

			// Footer text centered
			context.font = "12px Arial";
			const footerText = "Created on menu.world by ";
			const footerTextWidth = context.measureText(footerText).width;
			context.fillText(footerText, (canvas.width - footerTextWidth) / 2, canvas.height - 30);
			context.fillText("<HR>", (canvas.width - context.measureText("<HR>").width) / 2, canvas.height - 15);

			const dataURL = canvas.toDataURL("image/png");
			link.href = dataURL;
			link.download = `${finalTitle || "Menu"}-qr.png`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		};
	};

	if (loading)
		return (
			<div className="flex justify-center items-center min-h-screen">
				<span className="loading loading-dots loading-lg"></span>
			</div>
		);
	if (error) return <div className="text-red-500">{error}</div>;

	return (
		<>
			{menus.length === 0 ? (
				<p className="text-gray-800 dark:text-gray-200">No menus found.</p>
			) : (
				<div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{menus.map((menu) => (
						<div
							key={menu._id}
							className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-4 flex justify-between"
						>
							<div className="flex flex-col">
								<h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
									{menu.title || "Untitled Menu"}
								</h3>
								<p className="text-gray-600 dark:text-gray-400">Template: {menu.template || "N/A"}</p>
								<div className="mt-4 flex gap-3">
									<button
										onClick={() => handleDeleteMenu(menu._id)}
										className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
									>
										<i className="bx bx-trash"></i>
									</button>
									<Link
										to={`/menus/${menu._id}`}
										className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
									>
										<i className="bx bx-show"></i>
									</Link>
									<Link
										to={`/edit/${menu._id}`}
										className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
									>
										<i className="bx bx-edit"></i>
									</Link>
									<button
										onClick={() => openModal(menu)}
										className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
									>
										<i className="bx bx-download"></i>
									</button>
								</div>
							</div>
							<div className="ml-4">
								<img src={menu.qrCode} alt={`QR for ${menu.title}`} className="w-24 h-24 rounded" />
							</div>
						</div>
					))}
				</div>
			)}

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full">
						<h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">
							Customize QR Download
						</h2>
						<input
							type="text"
							placeholder="Title"
							className="w-full mb-2 p-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 text-gray-800 rounded placeholder-gray-500 dark:placeholder-gray-400"
							value={qrSettings.title}
							onChange={(e) => setQrSettings({ ...qrSettings, title: e.target.value })}
						/>
						<input
							type="Date"
							placeholder="Date"
							className="w-full mb-2 p-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 text-gray-800 rounded placeholder-gray-500 dark:placeholder-gray-400"
							value={qrSettings.date}
							onChange={(e) => setQrSettings({ ...qrSettings, date: e.target.value })}
						/>
						<input
							type="text"
							placeholder="Contact"
							className="w-full mb-2 p-2 border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 text-gray-800 rounded placeholder-gray-500 dark:placeholder-gray-400"
							value={qrSettings.contact}
							onChange={(e) => setQrSettings({ ...qrSettings, contact: e.target.value })}
						/>
						<label className="block mb-2 text-gray-800 dark:text-gray-200">Choose Background Color:</label>
						<input
							type="color"
							value={qrSettings.backgroundColor}
							onChange={(e) => setQrSettings({ ...qrSettings, backgroundColor: e.target.value })}
							className="w-1/4 h-10 mb-4 border dark:border-gray-700 rounded"
						/>
						<div className="flex justify-end gap-2">
							<button
								onClick={closeModal}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
							>
								Cancel
							</button>
							<button
								onClick={handleDownload}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							>
								Download
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MyMenu;
