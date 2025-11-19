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


