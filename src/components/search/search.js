import { El } from "../../utils/el.js";

export function Search() {
	const input = El({
		element: "div",
		className: "flex w-full relative p-4",
		children: [
			El({
				element: "img",
				src: "/public/Vector (6).svg",
				className: "absolute top-5 left-5 z-10 opacity-50 p-1",
			}),
			El({
				element: "input",
				placeholder: "Search",
				className: "bg-gray-100 rounded-sm w-full px-8 py-2",
			}),
			El({
				element: "img",
				src: "/public/equalizer-svgrepo-com.svg",
				className: "absolute opacity-50 w-9 right-5 top-5 p-2",
			}),
		],
	});

	const root = El({
		element: "div",
		className: "flex flex-col gap-2 w-[428px] h-[926px] p-4",
		children: [input],
	});

	return root;
}
