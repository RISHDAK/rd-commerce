document.getElementById("loginBtn").addEventListener("click", () => {

    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("Please create an account first.");

        return;

    }

    if (email === user.email && password === user.password) {

        alert("Login Successful!");

        window.location.href = "index.html";

    } else {

        alert("Invalid Email or Password");

    }

});