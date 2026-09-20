// =========================================================
// R&D COMMERCE — LOGIN SYSTEM
// =========================================================

const loginForm = document.getElementById("loginForm");

function getSavedUser() {
    try {
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (savedUser && typeof savedUser === "object") {
            return savedUser;
        }

        return null;

    } catch (error) {
        return null;
    }
}

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const passwordInput = document.getElementById("loginPassword");

        if (!emailInput || !passwordInput) return;

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        if (!email || !password) {

            if (typeof showToast === "function") {
                showToast("Please fill all fields", "⚠️");
            }

            return;
        }

        const user = getSavedUser();

        if (!user) {

            if (typeof showToast === "function") {
                showToast("Please create an account first", "👤");
            }

            setTimeout(function () {
                window.location.href = "signup.html";
            }, 800);

            return;
        }

        const savedEmail = String(user.email || "").trim().toLowerCase();
        const savedPassword = String(user.password || "");

        if (email === savedEmail && password === savedPassword) {

            if (typeof showToast === "function") {
                showToast("Login successful! Welcome back 👋", "✅");
            }

            setTimeout(function () {
                window.location.href = "index.html";
            }, 700);

        } else {

            if (typeof showToast === "function") {
                showToast("Invalid email or password", "❌");
            }

        }

    });

}