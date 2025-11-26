import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { El } from "../../utils/el";
import { router } from "../../utils/router";

export function swiper() {
	let mySwiper;

	const createSlide = (img, activeIndex, btnText, isLast = false) => {
		return El({
			element: "div",
			className: "swiper-slide flex flex-col ",
			children: [
				El({
					element: "img",
					src: img,
					className: "w-[428px]",
				}),
				El({
					element: "div",
					className:
						"flex flex-col justify-center items-center text-center gap-15 mt-5",
					children: [
						El({
							element: "div",
							className: "text-3xl font-bold",
							innerText: "We provide high quality products just for you",
						}),

						// -----------------
						El({
							element: "div",
							className: "flex gap-2",
							children: [
								El({
									element: "div",
									className: `w-7 h-1 ${
										activeIndex === 0 ? "bg-gray-800" : "bg-gray-300"
									}`,
								}),
								El({
									element: "div",
									className: `w-7 h-1 ${
										activeIndex === 1 ? "bg-gray-800" : "bg-gray-300"
									}`,
								}),
								El({
									element: "div",
									className: `w-7 h-1 ${
										activeIndex === 2 ? "bg-gray-800" : "bg-gray-300"
									}`,
								}),
							],
						}),

						// -----------btn
						El({
							element: "button",
							innerText: btnText,
							className:
								"bg-[#212529] rounded-4xl p-3 text-white w-[410px] mb-3",
							onclick: () => {
								if (isLast) {
									router.navigate("/login");
								} else {
									mySwiper.slideNext();
								}
							},
						}),
					],
				}),
			],
		});
	};

	const swiperWrapper = El({
		element: "div",
		className: "swiper-wrapper",
		children: [
			createSlide("/public/w-1.png", 0, "Next"),
			createSlide("/public/w2.png", 1, "Next"),
			createSlide("/public/w3.png", 2, "Get Started", true),
		],
	});

	const swiperContainer = El({
		element: "div",
		className: "swiper w-[428px] h-[926px]",
		children: [swiperWrapper],
	});

	setTimeout(() => {
		mySwiper = new Swiper(".swiper", {
			direction: "horizontal",
			loop: false,
		});
	}, 0);

	return swiperContainer;
}
