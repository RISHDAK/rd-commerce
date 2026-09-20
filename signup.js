// =========================================================
// R&D COMMERCE — SIGNUP SYSTEM
// =========================================================

const signupForm = document.getElementById("signupForm");

function getExistingUser() {
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

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("signupName");
        const emailInput = document.getElementById("signupEmail");
        const passwordInput = document.getElementById("signupPassword");

        if (!nameInput || !emailInput || !passwordInput) return;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        // BASIC VALIDATION
        if (!name || !email || !password) {

            if (typeof showToast === "function") {
                showToast("Please fill all fields", "⚠️");
            }

            return;
        }

        if (name.length < 2) {

            if (typeof showToast === "function") {
                showToast("Please enter a valid name", "⚠️");
            }

            return;
        }

        if (password.length < 6) {

            if (typeof showToast === "function") {
                showToast("Password must be at least 6 characters", "🔐");
            }

            return;
        }

        // CHECK EXISTING ACCOUNT
        const existingUser = getExistingUser();

        if (existingUser) {

            const existingEmail =
                String(existingUser.email || "").trim().toLowerCase();

            if (existingEmail === email) {

                if (typeof showToast === "function") {
                    showToast("An account with this email already exists", "⚠️");
                }

                setTimeout(function () {
                    window.location.href = "login.html";
                }, 900);

                return;
            }
        }

        // CREATE USER
        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        if (typeof showToast === "function") {
            showToast("Account created successfully! 🎉", "✅");
        }

        // GO TO LOGIN
        setTimeout(function () {
            window.location.href = "login.html";
        }, 800);

    });

}