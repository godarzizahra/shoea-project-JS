// src/components/home/SingleProduct.js
import { baseURL } from "../../api/config.js";
import { getCookieValue } from "../../utils/authUtils.js";
import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";

export async function SingleProduct(params) {
	const { id } = params;

	// ================================
	// FETCH PRODUCT
	// ================================
	async function fetchProduct() {
		try {
			const token = getCookieValue("sessionToken");
			const res = await fetch(`${baseURL}/sneaker/item/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) throw new Error("Failed to load product");
			return await res.json();
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	const product = await fetchProduct();
	if (!product) {
		return El({
			element: "p",
			className: "text-red-500 p-4",
			innerText: "Product Not Found",
		});
	}

	// ================================
	// STATE
	// ================================
	let quantity = 1;
	let selectedSize = null;
	let selectedColor = null;

	// Refs
	let quantityText;
	let priceText;

	// ================================
	// ROOT
	// ================================
	const root = El({
		element: "div",
		className: "w-[428px] mx-auto bg-white pb-10",
	});

	// BACK BUTTON
	root.appendChild(
		El({
			element: "img",
			src: "/public/Vector (3).svg",
			className: "w-6 cursor-pointer absolute top-4 left-4",
			eventListener: [
				{
					event: "click",
					callback: () => router.navigate("/home"),
				},
			],
		})
	);

	// PRODUCT IMAGE
	root.appendChild(
		El({
			element: "img",
			src: product.imageURL,
			className: "w-full object-cover rounded-b-3xl h-120",
		})
	);

	// NAME + HEART
	root.appendChild(
		El({
			element: "div",
			className: "flex justify-between px-5 mt-4",
			children: [
				El({
					element: "h2",
					className: "text-xl font-bold",
					innerText: product.name,
				}),
				El({
					element: "img",
					src: "/public/heart-angle-svgrepo-com.svg",
					className: "w-6 cursor-pointer",
				}),
			],
		})
	);

	// SOLD + RATING
	root.appendChild(
		El({
			element: "div",
			className: "flex gap-3 px-5 mt-2 text-sm",
			children: [
				El({
					element: "div",
					className: "bg-gray-200 px-3 py-1 rounded-xl",
					innerText: `${product.pid} sold`,
				}),
				El({
					element: "img",
					src: "/public/star-half-stroke-filled-svgrepo-com.svg",
					className: "w-6",
				}),
				El({
					element: "span",
					className: "text-gray-500",
					innerText: "4.3 (5,389 reviews)",
				}),
			],
		})
	);

	// DESCRIPTION
	root.appendChild(
		El({
			element: "h3",
			className: "text-lg font-semibold mt-6 px-5",
			innerText: "Description",
		})
	);

	root.appendChild(
		El({
			element: "p",
			className: "text-gray-600 px-5",
			innerText: product.description ?? "Lorem ipsum description text",
		})
	);

	// ================================
	// SIZE + COLOR SECTION (FIGMA STYLE)
	// ================================
	root.appendChild(
		El({
			element: "div",
			className: "px-5 mt-8 flex flex-col gap-6",

			children: [
				// SIZE + COLOR TITLES IN ONE ROW
				El({
					element: "div",
					className: "flex items-center gap-45",
					children: [
						El({
							element: "h3",
							className: "text-lg font-semibold",
							innerText: "Size",
						}),
						El({
							element: "h3",
							className: "text-lg font-semibold",
							innerText: "Color",
						}),
					],
				}),

				// SIZE ROW + COLOR SCROLL ROW
				El({
					element: "div",
					className: "flex justify-between items-start",

					children: [
						// SIZE LIST
						El({
							element: "div",
							className: "flex flex-col gap-2",

							children: [
								El({
									element: "div",
									className: "flex gap-2",

									children: product.sizes.split("|").map((size) =>
										El({
											element: "button",
											className:
												"border text-sm hover:bg-black hover:text-white transition rounded-4xl p-3",
											innerText: size,
											eventListener: [
												{
													event: "click",
													callback: (e) => {
														selectedSize = size;
														[...e.target.parentNode.children].forEach((btn) =>
															btn.classList.remove(
																"bg-black",
																"text-white",
																"border-black"
															)
														);
														e.target.classList.add(
															"bg-black",
															"text-white",
															"border-black"
														);
													},
												},
											],
										})
									),
								}),
							],
						}),

						// =========================================
						// COLOR — SCROLLABLE (MANUAL COLORS + TICK)
						// =========================================
						El({
							element: "div",
							className: "flex gap-3 overflow-x-auto max-w-[180px] px-1 py-1 ",
							style: { scrollbarWidth: "thin" },

							children: [
								"#ffffff",
								"#b0b0b0",
								"#800080",
								"#a0522d",
								"#0000ff",
							].map((color) =>
								El({
									element: "div",
									className:
										"relative rounded-full border shadow cursor-pointer transition hover:scale-110 h-10 w-10 min-w-10 min-h-10 flex items-center justify-center",
									style: { backgroundColor: color },

									// Tick icon inside (hidden by default)
									children: [
										El({
											element: "img",
											src: "/public/check-svgrepo-com.svg",
											className: "w-5 h-5 hidden select-check",
										}),
									],

									eventListener: [
										{
											event: "click",
											callback: (e) => {
												selectedColor = color;

												// remove ring + tick from all
												[...e.target.parentNode.children].forEach((el) => {
													el.classList.remove("ring-2", "ring-black");
													const check = el.querySelector(".select-check");
													if (check) check.classList.add("hidden");
												});

												// add ring to selected
												e.target.classList.add("ring-2", "ring-black");

												// show tick
												const check = e.target.querySelector(".select-check");
												if (check) check.classList.remove("hidden");
											},
										},
									],
								})
							),
						}),
					],
				}),
			],
		})
	);

	// ================================
	// QUANTITY SECTION
	// ================================
	root.appendChild(
		El({
			element: "div",
			className: "px-5 mt-6 flex gap-5 pb-2",

			children: [
				El({
					element: "h3",
					className: "text-lg font-semibold mb-3",
					innerText: "Quantity",
				}),

				El({
					element: "div",
					className:
						"flex items-center gap-6 px-3 rounded-4xl w-fit py-1 bg-gray-200",

					children: [
						// minus
						El({
							element: "button",
							className: "text-2xl",
							innerText: "−",
							eventListener: [
								{
									event: "click",
									callback: () => {
										if (quantity > 1) {
											quantity--;
											quantityText.innerText = quantity;
											priceText.innerText = "$" + quantity * product.price;
										}
									},
								},
							],
						}),

						// quantity text
						(quantityText = El({
							element: "span",
							className: "text-lg font-medium",
							innerText: quantity,
						})),
						// plus
						El({
							element: "button",
							className: "text-2xl",
							innerText: "+",
							eventListener: [
								{
									event: "click",
									callback: () => {
										quantity++;
										quantityText.innerText = quantity;
										priceText.innerText = "$" + quantity * product.price;
									},
								},
							],
						}),
					],
				}),
			],
		})
	);

	// ================================
	// PRICE + ADD TO CART
	// ================================
	priceText = El({
		element: "p",
		className: "text-xl font-bold",
		innerText: `$${product.price}`,
	});

	root.appendChild(
		El({
			element: "div",
			className: "flex justify-between items-center px-5 border-t pt-4",

			children: [
				El({
					element: "div",
					children: [
						El({
							element: "p",
							className: "text-gray-500 text-sm",
							innerText: "Total Price",
						}),
						priceText,
					],
				}),
				El({
					element: "button",
					className: "bg-black text-white px-6 py-3 rounded-3xl font-semibold",
					innerText: "Add to Cart",
				}),
			],
		})
	);

	return root;
}
