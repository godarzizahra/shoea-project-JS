import { Signup } from "./components/login/signup.js";
import { welcome } from "./components/onboarding/welcome.js";
import { Homepage } from "./pages/home/home.js";
import { LoginPage } from "./pages/login/login.js";
import { Onboardingpage } from "./pages/onboarding/onboarding.js";

import { swiper } from "./components/onboarding/swiper.js";
import "./style/style.css";
import { getCookieValue } from "./utils/authUtils.js";
import { router } from "./utils/router.js";

const app = document.getElementById("app");

const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute("/Onboardingpage", Onboardingpage);
router.addRoute("/welcome", welcome);
router.addRoute("/swiper", swiper);
router.addRoute("/Login", LoginPage);
router.addRoute("/Signup", Signup);
router.addRoute("/Home", Homepage);

router.init(pageContainer);

const token = getCookieValue("sessionToken");
if (!token) {
	router.navigate("/Login");
}
router.navigate("/Home");
