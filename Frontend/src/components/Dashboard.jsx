import { Link } from "react-router-dom";
import MyMenu from "./MyMenu";

const Dashboard = () => {
	return (
		<div className="min-h-screen mt-16   bg-gray-300 text-white p-8 flex flex-col dark:bg-gray-800">
			<h2 className="text-3xl text-gray-800 dark:text-gray-200 font-bold mb-6">Dashboard</h2>
			<div className="mb-4 text-xs sm:text-sm flex align-middle  justify-between sm:justify-normal">
				<Link
					to="/create-menu"
					className="mr-8  bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold p-2 rounded transition"
				>
					Create Menu
				</Link>
				<Link
					to="/explore"
					className="  bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold p-2 rounded transition"
				>
					Explore Templates
				</Link>
			</div>

			<MyMenu />
		</div>
	);
};

export default Dashboard;
