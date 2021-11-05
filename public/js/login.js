const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#userPassword").value.trim();

  if (username && password) {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to log in");
      }
    } catch (err) {
      console.error(err);
    }
  }
};

const registerHandler = async (event) => {
  event.preventDefault();

  const errorBox = "0 0 5px red";
  const successBox = "0 0 0 white";
  // store references to the form elements
  const usernameField = document.querySelector("#register-username-input");
  const passwordField = document.querySelector("#registerPassword");
  const confirmPasswordField = document.querySelector("#confirmPassword");
  const steamIdField = document.querySelector("#register-steamUID");
  const zipCodeField = document.querySelector("#register-zipCode");

  const username = usernameField.value.trim();
  const password = passwordField.value.trim();
  const confirmPassword = confirmPasswordField.value.trim();
  const steamId = steamIdField.value.trim();
  const zipcode = zipCodeField.value.trim();

  console.log(username, password, steamId, zipcode);
  // set the background of usernameField to white
  usernameField.style.backgroundColor = "white";

  // Highlight all invalid inputs red
  usernameField.style.boxShadow = username ? successBox : errorBox;
  passwordField.style.boxShadow = password ? successBox : errorBox;
  confirmPasswordField.style.boxShadow =
    confirmPassword === password && confirmPassword.length > 0
      ? successBox
      : errorBox;
  steamIdField.style.boxShadow =
    steamId || isNaN(steamID) ? successBox : errorBox;
  zipCodeField.style.boxShadow =
    zipcode && zipcode.length >= 5 && zipcode.length <= 6
      ? successBox
      : errorBox;

  if (password !== confirmPassword) {
    confirmPasswordField.style.boxShadow = errorBox;
    return;
  }

  if (username && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ username, password, steamId, zipcode }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Successfully registered");
      window.location.reload();
    } else {
      alert("Failed to register");
    }
  }
};

$(document).ready(function () {
  document
    .querySelector("#register-btn")
    .addEventListener("click", registerHandler);
  // Login and register buttons (on homepage) will refresh page
  // if default isn't prevented
  if (document.querySelector("#login-btn")) {
    document.querySelector("#login-btn").addEventListener("click", (e) => {
      e.preventDefault();
    });
  }

  if (document.querySelector("#homepage-register-btn")) {
    document
      .querySelector("#homepage-register-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
      });
  }

  if (document.querySelector("#stayloggedin")) {
    document
      .querySelector("#stayloggedin")
      .addEventListener("click", loginFormHandler);
  }
});
