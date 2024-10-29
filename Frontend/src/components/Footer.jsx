const Footer = () => {
	return (
		<footer className="p-4 bottom-0 bg-gray-900 dark:bg-gray-800 text-gray-400 text-center">
			<div className="space-y-4">
				<p>
					© {new Date().getFullYear()} Menu.world All rights reserved by{" "}
					<a href="https://harshalmali.online" target="none" className="text-xl text-blue-900 font-bold">
						{" "}
						&lt;HM&gt;{" "}
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
