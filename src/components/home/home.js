import { baseURL } from "../../api/config.js";
import { getCookieValue } from "../../utils/authUtils.js";
import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";

function resolveImageUrl(img) {
	if (!img) return "/public/logo.png"; // fallback
	if (img.startsWith("http://") || img.startsWith("https://")) return img;
	// handle possible leading slash
	if (img.startsWith("/")) return `${baseURL}${img}`;
	return `${baseURL}/${img}`;
}

// create header placeholder
function createHeaderPlaceholder() {
	return El({
		element: "div",
		className: "flex w-full justify-between p-4 items-center",
		children: [
			El({
				element: "div",
				className: "flex flex-col",
				children: [
					El({
						element: "span",
						innerText: "Good Morning👋",
						className: "text-2xl text-gray-400 font-bold",
					}),
					El({
						element: "span",
						innerText: "",
						className: "text-lg font-bold",
						dataset: { role: "username" },
					}),
				],
			}),
			El({
				element: "div",
				className: "flex items-center justify-center gap-3",
				children: [
					El({
						element: "img",
						src: "/public/Vector (7).svg",
						className: "w-6 h-6",
					}),
					El({
						element: "img",
						src: "/public/Vector (8).svg",
						className: "w-6 h-6",
					}),
				],
			}),
		],
	});
}

// header username
async function fillHeaderUsername(headerEl) {
	try {
		const token = getCookieValue("sessionToken");
		if (!token) return;
		const res = await fetch(`${baseURL}/user`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (!res.ok) return;
		const json = await res.json();
		const usernameSpan = headerEl.querySelector("[data-role='username']");
		if (usernameSpan) usernameSpan.innerText = json.username || "";
	} catch (err) {
		console.error("Failed to load username", err);
	}
}

// create brand container
function createBrandContainer() {
	const wrapper = El({
		element: "div",
		className: "w-full overflow-x-auto flex gap-3 pb-2 hide-scrollbar",
		attr: { "aria-label": "brand-list" },
	});
	return wrapper;
}

// create product grid container
function createProductContainer() {
	return El({
		element: "div",
		className: "grid grid-cols-2 gap-4 p-2 overflow-y-auto",
		attr: { "aria-label": "product-grid" },
	});
}

// create bottom menu
function createBottomMenu() {
	return El({
		element: "div",
		className:
			"fixed bottom-0 left-0 w-full flex justify-around px-8 py-4 bg-white border-t",
		children: [
			El({
				element: "div",
				className: "flex flex-col items-center gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (9).svg",
						className: "w-7",
					}),
					El({ element: "span", innerText: "Home" }),
				],
			}),
			El({
				element: "div",
				className: "flex flex-col items-center gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (10).svg",
						className: "w-7",
					}),
					El({ element: "span", innerText: "Cart" }),
				],
			}),
			El({
				element: "div",
				className: "flex flex-col items-center gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (11).svg",
						className: "w-7",
					}),
					El({ element: "span", innerText: "Orders" }),
				],
			}),
			El({
				element: "div",
				className: "flex flex-col items-center gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (12).svg",
						className: "w-7",
					}),
					El({ element: "span", innerText: "Wallet" }),
				],
			}),
			El({
				element: "div",
				className: "flex flex-col items-center gap-1",
				children: [
					El({
						element: "img",
						src: "/public/Vector (13).svg",
						className: "w-7",
					}),
					El({ element: "span", innerText: "Profile" }),
				],
			}),
		],
	});
}
//render product Card
function renderProductCard(product) {
	const imgUrl = resolveImageUrl(product.imageURL || product.images?.[0]);

	const card = El({
		element: "div",
		className: "flex flex-col  bg-white rounded-2xl p-3 cursor-pointer",
		children: [
			El({
				element: "div",
				className:
					"bg-gray-100 p-4 rounded-xl w-full flex justify-center items-center ",
				children: [
					El({
						element: "img",
						src: imgUrl,
						className: "w-full h-32 object-contain",
					}),
				],
			}),
			El({
				element: "span",
				innerText: product.name,
				className: "py-2 text-left font-medium",
			}),
			El({
				element: "span",
				innerText: `$ ${product.price}`,
				className: "text-left text-gray-700 font-bold ",
			}),
		],
	});

	card.addEventListener("click", () => {
		router.navigate(`/single/${product.id}`);
	});

	return card;
}

// main Home function
export function Home() {
	const token = getCookieValue("sessionToken");
	if (!token) {
		router.navigate("/login");
		return El({ element: "div" });
	}

	const root = El({
		element: "div",
		className:
			"w-[428px] h-[926px] bg-white pb-28 flex flex-col gap-2 items-center justify-start p-2 overflow-hidden",
	});

	const header = createHeaderPlaceholder();
	root.appendChild(header);
	fillHeaderUsername(header);

	// search
	const search = El({
		element: "div",
		className: "flex w-full relative p-4 ",
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
				eventListener: [
					{
						event: "click",
						callback: () => router.navigate("/search"),
					},
				],
			}),
		],
	});
	root.appendChild(search);

	// section title
	const sectionTitle = El({
		element: "span",
		innerText: "Most Popular",
		className: "text-xl font-bold w-full px-2",
	});
	root.appendChild(sectionTitle);

	const brandContainer = createBrandContainer();
	root.appendChild(brandContainer);

	// product container _scroll
	const productWrapper = El({
		element: "div",
		className: "w-full flex-1 overflow-y-auto px-2 py-2",
	});
	const productGrid = createProductContainer();
	productWrapper.appendChild(productGrid);
	root.appendChild(productWrapper);

	// infinity button
	const infinityBtn = El({
		element: "div",
		innerText: "Infinity Scrolling for Pagination",
		className: "w-full  pr-4 pt-2 pb-4 font-bold cursor-pointer text-center",
	});
	root.appendChild(infinityBtn);

	// bottom menu
	const bottomMenu = createBottomMenu();
	root.appendChild(bottomMenu);

	// Add hide-scrollbar CSS class
	if (!document.getElementById("home-hide-scrollbar-style")) {
		const styleTag = document.createElement("style");
		styleTag.id = "home-hide-scrollbar-style";
		styleTag.innerHTML = `
      /* hide horizontal scrollbar visually but keep scroll functionality */
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      /* ensure product-grid scroll area has proper padding at bottom for fixed menu */
      .product-padding-bottom { padding-bottom: 96px; }
    `;
		document.head.appendChild(styleTag);
	}

	// fetch & render
	(async function loadDataAndRender() {
		try {
			// fetch brands
			const brandsRes = await fetch(`${baseURL}/sneaker/brands`, {
				headers: { Authorization: `Bearer ${getCookieValue("sessionToken")}` },
			});
			const brands = brandsRes.ok ? await brandsRes.json() : [];

			// -----------------------
			const allBtn = El({
				element: "span",
				innerText: "All",
				className:
					"border-2 px-5  text-lg font-bold border-gray-600 text-gray-600 rounded-full cursor-pointer ",
			});
			brandContainer.appendChild(allBtn);

			// ----------------
			let activeBtn = allBtn;
			allBtn.classList.add("bg-black", "text-white");
			let activeBrand = null;

			// on click
			function setActiveBrand(btnEl, brandName) {
				if (activeBtn) {
					activeBtn.classList.remove("bg-black", "text-white");
					activeBtn.classList.add("border-gray-600", "text-gray-600");
				}
				btnEl.classList.remove("border-gray-600", "text-gray-600");
				btnEl.classList.add("bg-black", "text-white");
				activeBtn = btnEl;
				activeBrand = brandName === "All" ? null : brandName;
				visibleCount = 10;
				renderProducts();
			}

			allBtn.addEventListener("click", () => setActiveBrand(allBtn, "All"));

			// create other brand
			brands.forEach((b) => {
				const btn = El({
					element: "span",
					innerText: b,
					className:
						" border-2 px-5 py-1 text-lg font-bold border-gray-600 text-gray-600 rounded-full cursor-pointer capitalize whitespace-nowrap ",
				});
				btn.addEventListener("click", () => setActiveBrand(btn, b));
				brandContainer.appendChild(btn);
			});

			// fetch products
			const productsRes = await fetch(`${baseURL}/sneaker?page=1&limit=200`, {
				headers: { Authorization: `Bearer ${getCookieValue("sessionToken")}` },
			});
			const productsJson = productsRes.ok
				? await productsRes.json()
				: { data: [] };
			const products = productsJson.data || [];

			//  product grid
			productGrid.classList.add("product-padding-bottom");

			// product render
			let visibleCount = 10;

			function renderProducts() {
				productGrid.innerHTML = "";
				let filtered = products;
				if (activeBrand)
					filtered = products.filter((p) => p.brand === activeBrand);

				const slice = filtered.slice(0, visibleCount);
				slice.forEach((p) => productGrid.appendChild(renderProductCard(p)));

				// visible infinity button
				if (visibleCount < filtered.length) {
					infinityBtn.style.display = "block";
				} else {
					infinityBtn.style.display = "none";
				}
			}

			infinityBtn.addEventListener("click", () => {
				visibleCount += 10;
				renderProducts();
			});

			renderProducts();
		} catch (err) {
			console.error("Home load error:", err);
			// fallback UI
			productGrid.innerHTML =
				"<div class='p-4 text-center text-red-500'>Failed to load products</div>";
		}
	})();

	return root;
}
