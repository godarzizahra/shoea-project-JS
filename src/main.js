import { Signup } from "./components/login/signup.js";
import { LoginPage } from "./pages/login/login.js";
import "./style/style.css";
import { router } from "./utils/router.js";

const app = document.getElementById("app");

const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

// router.addRoute("/Onboardingpage", Onboardingpage);
// if (JSON.parse(localStorage.getItem("Onboardingpage"))) {
// 	router.navigate("/");
// } else {
// 	router.navigate("/Onboardingpage");
// }
// router.addRoute("/welcome", welcome);
// router.addRoute("/swiper", () => swiper());
router.addRoute("/Login", LoginPage);
router.navigate("/Login");
router.addRoute("/Signup", Signup);
router.init(pageContainer);
