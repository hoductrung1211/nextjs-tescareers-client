export function isLoggedIn() {
    if (localStorage) {
        const accessToken = localStorage.getItem("accessToken");

        return typeof accessToken == "string";
    }

    return false;
}