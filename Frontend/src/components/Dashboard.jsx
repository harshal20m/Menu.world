import { Link } from "react-router-dom";
import MyMenu from "./MyMenu";

const Dashboard = () => {
	return (
		<div className="min-h-screen bg-gray-300 text-white p-8 flex flex-col dark:bg-gray-800">
			<h2 className="text-4xl text-gray-800 dark:text-gray-200 font-bold mb-6">Dashboard</h2>
			<div className="mb-4">
				<Link
					to="/create-menu"
					className="inline-block bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded transition"
				>
					Create Menu
				</Link>
			</div>

			<MyMenu />
		</div>
	);
};

export default Dashboard;
