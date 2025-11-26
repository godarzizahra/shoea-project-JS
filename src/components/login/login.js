import { baseURL } from "../../api/config.js";
import { setCookie } from "../../utils/authUtils.js";
import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";

export function Login() {
	let usernameValue = "";
	let passwordValue = "";
	let passwordVisible = false;

	function updateButtonState() {
		const btn = document.getElementById("submit-btn");
		if (!btn) return;
		if (usernameValue.trim() !== "" && passwordValue.trim() !== "") {
			btn.classList.remove("opacity-50");
			btn.classList.add("opacity-100");
			btn.disabled = false;
		} else {
			btn.classList.add("opacity-50");
			btn.classList.remove("opacity-100");
			btn.disabled = true;
		}
	}

	function togglePassword() {
		const input = document.getElementById("password");
		if (!input) return;
		passwordVisible = !passwordVisible;
		input.setAttribute("type", passwordVisible ? "text" : "password");
	}

	async function handleSubmit() {
		try {
			const response = await fetch(`${baseURL}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: usernameValue,
					password: passwordValue,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || "Login failed");
				return;
			}

			setCookie("sessionToken", data.token);

			router.navigate("/home");
		} catch (error) {
			console.error("Error:", error);
			alert("Server error");
		}
	}

	const formLogin = El({
		element: "div",
		className: "min-h-screen bg-white pb-20 flex items-center justify-start",
		children: [
			El({
				element: "div",
				className:
					"flex flex-col items-center gap-5 w-[428px] h-[926px] p-6 relative",
				children: [
					El({
						element: "img",
						src: "/public/Vector (3).svg",
						className: "absolute left-6 top-4",
						eventListener: [
							{ event: "click", callback: () => router.navigate("/swiper") },
						],
					}),
					El({
						element: "img",
						src: "/public/logo.png",
						className: "mt-15 mb-20",
					}),
					El({
						element: "h1",
						innerText: "Login to Your Account",
						className: "text-3xl font-bold mb-8",
					}),

					El({
						element: "div",
						className: "flex w-full relative",
						children: [
							El({
								element: "img",
								className: "absolute top-3 left-2 z-10  ",
								src: "/public/Vector (5).svg",
							}),
							El({
								element: "input",
								className: "bg-gray-100  rounded-sm w-full px-8 py-1",
								placeholder: "username",
								id: "username",
								eventListener: [
									{
										event: "input",
										callback: (e) => {
											usernameValue = e.target.value;
											updateButtonState();
										},
									},
								],
							}),
						],
					}),

					El({
						element: "div",
						className: "w-full relative",
						children: [
							El({
								element: "img",
								className: "absolute top-3 left-2 z-10",
								src: "/public/input-prefix.svg",
							}),
							El({
								element: "input",
								className: "bg-gray-100  rounded-sm w-full px-8 py-1",
								placeholder: "password",
								id: "password",
								type: "password",
								eventListener: [
									{
										event: "input",
										callback: (e) => {
											passwordValue = e.target.value;
											updateButtonState();
										},
									},
								],
							}),
							El({
								element: "img",
								className:
									"absolute top-3 right-2 z-10 cursor-pointer opacity-70 ",
								src: "/public/input-suffix.svg",
								eventListener: [{ event: "click", callback: togglePassword }],
							}),
						],
					}),

					El({
						element: "div",
						innerText: "signup",
						className: "mt-2 text-black cursor-pointer underline",
						eventListener: [
							{ event: "click", callback: () => router.navigate("/signup") },
						],
					}),

					El({
						element: "button",
						innerText: "sign up",
						id: "submit-btn",
						className:
							"w-[390px] bg-black opacity-50 text-white py-3 rounded-3xl mt-4 absolute bottom-12",
						attr: { disabled: true },
						eventListener: [{ event: "click", callback: handleSubmit }],
					}),
				],
			}),
		],
	});

	return formLogin;
}
