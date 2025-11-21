import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";

export function Signup() {
	let usernameValue = "";
	let passwordValue = "";
	let passwordVisible = false;
	//--------------------------
	function updateButtonState() {
		const btn = document.getElementById("submit-btn");
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

	//  ---------------
	function togglePassword() {
		const input = document.getElementById("password");
		passwordVisible = !passwordVisible;

		if (passwordVisible) {
			input.setAttribute("type", "text");
		} else {
			input.setAttribute("type", "password");
		}
	}
	//---------------------------------
	async function handleSubmit() {
		try {
			const response = await fetch("http://localhost:3000/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: usernameValue,
					password: passwordValue,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || "Signup failed");
				return;
			}

			console.log("Signup success:", data);

			router.navigate("/Login");
			("/login");
		} catch (error) {
			console.error("Error:", error);
			alert("Server error");
		}
	}

	const formSignUp = El({
		element: "div",
		className:
			"w-[428px] h-[926px] bg-white pb-20 flex items-center justify-start ",
		children: [
			El({
				element: "div",
				className:
					"w-[428px] h-[926px] flex flex-col items-center gap-5  p-6 relative",

				children: [
					El({
						element: "img",
						src: "/public/logo.png",
						className: "mt-15 mb-20",
					}),

					El({
						element: "h1",
						innerText: "Signup to Your Account",
						className: "text-3xl font-bold mb-8",
					}),

					// username
					El({
						element: "div",
						className: "flex w-full relative",
						children: [
							El({
								element: "img",
								className: "absolute top-3 left-2 z-10 opacity-50 ",
								src: "/public/Vector (4).svg",
							}),
							El({
								element: "input",
								className: "bg-gray-100  rounded-sm w-full px-8 py-2",
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
									El({
										element: "img",
										src: "/public/Vector (3).svg",
										className: "absolute left-6 top-4",
										eventListener: [
											{
												event: "click",
												callback: () => router.navigate("/swiper"),
											},
										],
									}),
								],
							}),
						],
					}),

					//  password
					El({
						element: "div",
						className: "w-full relative",
						children: [
							El({
								element: "img",
								className: "absolute top-3 left-2 z-10",
								src: "/public/lock-fill.svg",
							}),
							El({
								element: "input",
								className: "bg-gray-100  rounded-sm w-full px-8 py-2",
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
								eventListener: [
									{
										event: "click",
										callback: togglePassword,
									},
								],
							}),
						],
					}),

					//  login
					El({
						element: "div",
						innerText: "Login",
						className: "mt-2 text-black cursor-pointer underline",
						eventListener: [
							{
								event: "click",
								callback: () => router.navigate("/Login"),
							},
						],
					}),

					//  submit button
					El({
						element: "button",
						innerText: "sign up",
						id: "submit-btn",
						className:
							"w-[390px] bg-black opacity-50 text-white py-3 rounded-3xl mt-4 absolute bottom-5",
						attr: { disabled: true },
						eventListener: [
							{
								event: "click",
								callback: handleSubmit,
							},
						],
					}),
				],
			}),
		],
	});

	return formSignUp;
}
