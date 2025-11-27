import { SingleProduct } from "./components/home/singelProduct.js";
import { Signup } from "./components/login/signup.js";
import { swiper } from "./components/onboarding/swiper.js";
import { welcome } from "./components/onboarding/welcome.js";
import { Search } from "./components/search/search.js";
import { Homepage } from "./pages/home/home.js";
import { LoginPage } from "./pages/login/login.js";
import { Onboardingpage } from "./pages/onboarding/onboarding.js";
import "./style/style.css";
import { getCookieValue } from "./utils/authUtils.js";
import { router } from "./utils/router.js";

const app = document.getElementById("app");
const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute("/onboarding", Onboardingpage);
router.addRoute("/welcome", welcome);
router.addRoute("/swiper", swiper);
router.addRoute("/login", LoginPage);
router.addRoute("/signup", Signup);
router.addRoute("/home", Homepage);
router.addRoute("/single/:id", SingleProduct);
router.addRoute("/search", Search);

const token = getCookieValue("sessionToken");
if (!token) {
	router.navigate("/onboarding");
} else {
	router.navigate("/home");
}

router.init(pageContainer);
