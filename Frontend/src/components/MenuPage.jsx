import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";
import Template6 from "./templates/Template6";
import Template7 from "./templates/Template7";
import Template8 from "./templates/Template8";
import Template9 from "./templates/Template9";
import Template11 from "./templates/Template11";

const templates = {
	1: Template1,
	2: Template2,
	3: Template3,
	4: Template4,
	5: Template5,
	6: Template6,
	7: Template7,
	8: Template8,
	9: Template9,
	11: Template11,
};

const MenuPage = () => {
	const { id } = useParams();
	const [menu, setMenu] = useState(null);
	const [TemplateComponent, setTemplateComponent] = useState(null);

	useEffect(() => {
		const fetchMenu = async () => {
			try {
				const response = await axiosInstance.get(`/menus/${id}`);
				setMenu(response.data);
				const selectedTemplate = templates[response.data.template]; // Get the template component based on the template ID
				setTemplateComponent(() => selectedTemplate);
			} catch (error) {
				console.error(error.response.data);
			}
		};
		fetchMenu();
	}, [id]);

	if (!menu) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<span className="loading loading-dots loading-lg"></span>
			</div>
		); // Loading state
	}

	if (!TemplateComponent) {
		return <div className="text-white">Template not found.</div>; // Handle case when template is not found
	}

	return (
		<div className="mt-16 min-h-[90vh] m-4 pt-12 mb-10">
			<TemplateComponent menu={menu} />
		</div>
	);
};

export default MenuPage;
