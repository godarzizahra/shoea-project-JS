import { El } from "../../utils/el";

export function Home() {
	const homeP = El({
		element: "div",
		className:
			"w-[428px] h-[926px] bg-white pb-20 flex items-center justify-start ",
		children: [headerHome, search, menuHome],
	});

	//header
	const headerHome = El({
		element: "div",
		className: "flex w-full justify-between",
		children: [
			El({
				element: "div",
				className: "flext flex-col",
				children: [
					El({
						element: "span",
						innerText: "Good Morning👋",
						className: "text-2xl text-gray-400",
					}),
					El({
						element: "span",
						//Add username
					}),
				],
			}),
			El({
				element: "div",
				className: "flex items-center justify-center",
				children: [
					El({ element: "img", src: "/public/Vector (7).svg" }),
					El({ element: "img", src: "/public/Vector (8).svg" }),
				],
			}),
		],
	});

	//search
	const search = El({
		element: "div",
		className: "flex w-full relative",
		children: [
			El({
				element: "img",
				className: "absolute top-3 left-2 z-10 opacity-50 ",
				src: "/public/Vector (6).svg",
			}),
			El({
				element: "input",
				className: "bg-gray-100  rounded-sm w-full px-8 py-2",
				placeholder: "Search",
				id: "search",
			}),
		],
	});
	//Most Popular
	const selectBerand = El({
		element: "div ",
		children: [El({ element: "span", innerText: "All" })],
	});
	//menu
	const menuHome = El({
		element: "div",
		className: "flex w-full gap-2 items-center justify-center",
		children: [
			//Home
			El({
				element: "div",
				className: "flex flex-col gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (9).svg",
					}),
					El({
						element: "span",
						innerText: "Home",
					}),
				],
			}),
			//cart
			El({
				element: "div",
				className: "flex flex-col gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (10).svg",
					}),
					El({
						element: "span",
						innerText: "Cart",
					}),
				],
			}),
			//orders
			El({
				element: "div",
				className: "flex flex-col gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (11).svg",
					}),
					El({
						element: "span",
						innerText: "Orders",
					}),
				],
			}),
			//Wallet
			El({
				element: "div",
				className: "flex flex-col gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (12).svg",
					}),
					El({
						element: "span",
						innerText: "Wallet",
					}),
				],
			}),
			//Profile
			El({
				element: "div",
				className: "flex flex-col gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (13).svg",
					}),
					El({
						element: "span",
						innerText: "Profile",
					}),
				],
			}),
		],
	});
	return;
}
