import { swiper } from "./components/onboarding/swiper.js";
import { welcome } from "./components/onboarding/welcome.js";
import { Onboardingpage } from "./pages/onboarding/onboarding.js";
import "./style/style.css";
import { router } from "./utils/router.js";

const app = document.getElementById("app");

const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute("/Onboardingpage", Onboardingpage);
if (JSON.parse(localStorage.getItem("Onboardingpage"))) {
	router.navigate("/");
} else {
	router.navigate("/Onboardingpage");
}
router.addRoute("/welcome", welcome);
router.addRoute("/swiper", () => swiper());
router.init(pageContainer);

// import Swiper from "swiper";
// import "./style/style.css";
// import { El } from "./utils/el.js";

// // import styles bundle
// import "swiper/css";

// const app = document.getElementById("app");
// // router.addRoute("/onBoarding", onBoarding);
// // if(JSON.parse(localStorage.getItem('onBoarding'))){
// // router.navigate("/")
// // }else{
// // router.navigate("/onBoarding");
// // }
// // router.addRoute("/onBoarding/page1",onBoardingPage1);
// // router.init(app)
// const swiperContainer = El({
// 	element: "div",
// 	className: " swiper my-swiper",
// 	children: [
// 		El({
// 			element: "div",
// 			className: "swiper-wrapper",
// 			children: [
// 				El({
// 					element: "div",
// 					innerText: "slide one",
// 					className: "swiper-slide",
// 				}),
// 				El({
// 					element: "div",
// 					innerText: "slide Two",
// 					className: "swiper-slide",
// 				}),
// 				El({
// 					element: "div",
// 					innerText: "slide Three",
// 					className: "swiper-slide",
// 				}),
// 				El({
// 					element: "div",
// 					innerText: "slide four",
// 					className: "swiper-slide",
// 				}),
// 			],
// 		}),
// 	],
// });

// const button = El({
// 	element: "div",
// 	className: "flex p-2",
// 	children: [
// 		El({
// 			element: "button",
// 			className: "p-2 font-[inter]",
// 			innerText: "next",
// 			onclick: () => swiper.slideNext(),
// 		}),
// 		El({
// 			element: "button",
// 			className: "p-2",
// 			innerText: "back",
// 		}),
// 	],
// });
// function swiperP() {
// 	swiper.slidePrev();
// }
// function swiperN() {
// 	swiper.slideNext();
// }
// app.append(swiperContainer, button);
// const swiper = new Swiper(".my-swiper", { slidesPerView: 1 });
