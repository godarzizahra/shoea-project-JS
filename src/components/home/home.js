import { El } from "../../utils/el";

//header
const headerHome = El({
	element: "div",
	className: "flex w-full justify-between p-4",
	children: [
		El({
			element: "div",
			className: "flex flex-col",
			children: [
				El({
					element: "span",
					innerText: "Good Morning👋",
					className: "text-2xl text-gray-400 text-xl font-bold",
				}),
				El({
					element: "span",
					className: "text-lg font-bold",
					innerText: "Add username",
					//Add username
				}),
			],
		}),
		El({
			element: "div",
			className: "flex items-center justify-center gap-3",
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
	className: "flex w-full relative p-4",
	children: [
		El({
			element: "img",
			className: "absolute top-7 left-6 z-10 opacity-50 ",
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
	element: "div",
	className: "flex flex-col w-full  py-2 px-2",
	children: [
		El({
			element: "span",
			innerText: "Most Popular",
			className: "text-xl font-bold px-3 py-2",
		}),
		El({
			element: "div",
			className: "flex gap-3",
			children: [
				El({
					element: "span",
					innerText: "All",
					className:
						"border-2 px-7 py-3 text-xl font-bold border-gray-600 text-gray-600  rounded-4xl",
				}),
			],
		}),
	],
});
//cart product
const cartProducts = El({
	element: "div",
	className: "grid grid-cols-2 ",
	children: [
		El({
			element: "div",
			className: "flex flex-col justify-center items-center ",
			children: [
				El({
					element: "div",
					className: "bg-[#F3F3F3] p-15 rounded-3xl",
					children: [El({ element: "img", src: "/public/logo.png" })],
				}),
				El({
					element: "span",
					innerText: "K-Swiss ista Train...",
					className: "py-3",
				}),
				El({
					element: "span",
					innerText: "$ 85.00",
				}),
			],
		}),
	],
});
//menu
const menuHome = El({
	element: "div",
	className:
		"fixed bottom-0 left-0 flex w-full gap-2 items-end justify-around px-8 py-4 ",
	children: [
		//Home
		El({
			element: "div",
			className: "flex flex-col gap-1 justify-center items-center",
			children: [
				El({
					element: "img",
					src: "/public/Vector (9).svg",
					className: "w-7",
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
			className: "flex flex-col gap-1 justify-center items-center",
			children: [
				El({
					element: "img",
					src: "/public/Vector (10).svg",
					className: "w-7",
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
			className: "flex flex-col gap-1 justify-center items-center",
			children: [
				El({
					element: "img",
					src: "/public/Vector (11).svg",
					className: "w-7",
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
			className: "flex flex-col gap-1 justify-center items-center",
			children: [
				El({
					element: "img",
					src: "/public/Vector (12).svg",
					className: "w-7",
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
			className: "flex flex-col gap-1 justify-center items-center",
			children: [
				El({
					element: "img",
					src: "/public/Vector (13).svg",
					className: "w-7",
				}),
				El({
					element: "span",
					innerText: "Profile",
				}),
			],
		}),
	],
});
export function Home() {
	//check Token
	const hasToken = document.cookie.includes("token=");
	if (!hasToken) {
		router.navigate("/Login");
		return;
	}
	//home page
	const home = El({
		element: "div",
		className:
			"w-[428px] h-[926px] bg-white pb-20 flex flex-col items-center justify-start p-2",
		children: [headerHome, search, selectBerand, cartProducts, menuHome],
	});

	return home;
}
