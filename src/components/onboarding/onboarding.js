import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";

export function Onboarding() {
	const page = El({
		element: "div",
		className:
			"w-[428px] h-screen bg-white flex flex-col justify-center-safe items-center gap-30",
		children: [
			El({
				element: "img",
				src: "/public/Group 2.png",
			}),
			El({
				element: "div",
				className:
					" w-12 h-12 rounded-full border-4 border-black border-t-transparent animate-spin",
			}),
		],
	});

	setTimeout(() => router.navigate("/welcome"), 3000);

	return page;
}
