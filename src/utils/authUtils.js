export function getCookieValue(name) {
	const cookies = document.cookie.split("; ");
	for (let cookie of cookies) {
		if (cookie.startsWith(name + "=")) {
			return cookie.split("=")[1];
		}
	}
	return null;
}

export function setCookie(name, value, days = 7) {
	const d = new Date();
	d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

export function deleteCookie(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function getUserToken() {
	return getCookieValue("sessionToken");
}
