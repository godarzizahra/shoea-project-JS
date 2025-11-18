import { El } from "../../utils/el";
import { router } from "../../utils/router.js";
export function welcome() {
	const welcomePage = El({
		element: "div",
		className: "w-[428px] h-screen flex flex-col relative",
		children: [
			El({
				element: "img",
				className: "w-[428px] h-screen object-cover brightness-50",
				src: "/public/WallpaperDog-20534610 1.png",
			}),
			El({
				element: "div",
				className:
					"absolute bottom-10 left-0 text-left  p-4 flex flex-col gap-7",
				children: [
					El({
						element: "span",
						innerText: "Wlcome to 👋",
						className: "text-white  text-5xl font-bold block ",
					}),
					El({
						element: "span",
						innerText: "Shoea",
						className: "text-white text-6xl font-bold block",
					}),
					El({
						element: "span",
						innerText:
							"The best sneakers & shoes e-commerse app of the century for your fashion needs!",
						className: "text-white text-1xl font-bold block",
					}),
				],
			}),
		],
	});
	setTimeout(() => router.navigate("/swiper"), 2000);
	return welcomePage;
}
