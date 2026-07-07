document.getElementById("signupBtn").addEventListener("click",()=>{

const user={

name:document.getElementById("signupName").value,

email:document.getElementById("signupEmail").value,

password:document.getElementById("signupPassword").value

};

localStorage.setItem("user",JSON.stringify(user));

alert("Account Created Successfully!");

window.location.href="login.html";

});