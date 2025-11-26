// مسیر را مطابق پروژه‌ات تنظیم کن

import { store } from "./store.js";
function createRouter() {
	let routes = {};
	let currentRoute = "";
	let currentParams = {};

	function addRoute(path, component) {
		routes[path] = component;
	}

	function pathToRegex(path) {
		const keys = [];
		const pattern = path
			.replace(/\//g, "\\/")
			.replace(/:(\w+)/g, (match, key) => {
				keys.push(key);
				return "([^\\/]+)";
			});
		return {
			pattern: new RegExp(`^${pattern}$`),
			keys,
		};
	}

	function matchRoute(path) {
		for (const routePath in routes) {
			const { pattern, keys } = pathToRegex(routePath);
			const match = path.match(pattern);
			if (match) {
				const params = {};
				keys.forEach((key, index) => {
					params[key] = match[index + 1];
				});
				return {
					component: routes[routePath],
					params,
				};
			}
		}
		return null;
	}

	function getHash() {
		const pathname = window.location.pathname;
		return pathname === "/" ? "/" : pathname;
	}

	function navigate(path) {
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;
		window.history.pushState({}, "", normalizedPath);
		window.dispatchEvent(new PopStateEvent("popstate"));
	}

	// -------------------------
	// Async-aware render:
	// -------------------------
	async function render(container) {
		const hash = getHash();
		const matched = matchRoute(hash);

		if (matched) {
			currentRoute = hash;
			currentParams = matched.params;

			store.setState("currentRoute", hash);
			store.setState("routeParams", matched.params);

			// clear container
			container.innerHTML = "";

			try {
				// call component (may return Node or Promise)
				const maybePromise = matched.component(matched.params);

				// If component returns a Promise, await it
				const componentElement =
					maybePromise instanceof Promise ? await maybePromise : maybePromise;

				// if componentElement is a Node -> append, else if it's a string create text node
				if (componentElement instanceof Node) {
					container.appendChild(componentElement);
				} else if (typeof componentElement === "string") {
					container.appendChild(document.createTextNode(componentElement));
				} else if (componentElement && componentElement.el instanceof Node) {
					// in case your El util returns an object { el: node } — adapt if needed
					container.appendChild(componentElement.el);
				} else {
					// fallback: show simple message (helps debugging)
					container.innerHTML =
						"<div class='p-6 text-center text-red-500'>Component did not return a valid DOM node.</div>";
					console.error(
						"Router: component returned invalid type:",
						componentElement
					);
				}
			} catch (err) {
				console.error("Error while rendering component:", err);
				container.innerHTML =
					"<div class='p-6 text-center text-red-500'>Error loading page. Check console.</div>";
			}
		} else {
			if (hash !== "/") {
				navigate("/");
			} else {
				container.innerHTML =
					"<div class='p-6 text-center text-red-500'>404 - Page Not Found</div>";
			}
		}
	}

	function init(container) {
		const handleRouteChange = () => {
			// call render but don't block event loop
			render(container).catch((err) =>
				console.error("Router render error:", err)
			);
		};

		window.addEventListener("popstate", handleRouteChange);

		const checkPathInterval = setInterval(() => {
			const currentPath = getHash();
			if (currentPath !== currentRoute) {
				handleRouteChange();
			}
		}, 200);

		window.addEventListener("beforeunload", () => {
			clearInterval(checkPathInterval);
		});

		window.addEventListener("focus", () => {
			const currentPath = getHash();
			if (currentPath !== currentRoute) {
				handleRouteChange();
			}
		});

		// initial render
		handleRouteChange();
	}

	function getCurrentRoute() {
		return currentRoute;
	}

	function getCurrentParams() {
		return currentParams;
	}

	return {
		addRoute,
		navigate,
		init,
		getCurrentRoute,
		getCurrentParams,
	};
}

export const router = createRouter();
