const loginFormHandler = async (event) => {
  // TODO: Add a comment describing the functionality of this statement
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
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
  // const confirmPasswordField = document.querySelector("#confirmPassword");
  const steamIdField = document.querySelector("#register-steamUID");
  const zipCodeField = document.querySelector("#register-zipCode");

  const username = usernameField.value.trim();
  const password = passwordField.value.trim();
  const steamId = steamIdField.value.trim();
  const zipcode = zipCodeField.value.trim();

  console.log(username, password, steamId, zipcode);
  // set the background of usernameField to white
  usernameField.style.backgroundColor = "white";
  if (!username || isAlphaNumeric(username) === false) {
    usernameField.style.boxShadow = errorBox;
  } else {
    usernameField.style.boxShadow = successBox;
  }

  if (!password) {
    passwordField.style.boxShadow = errorBox;
  } else {
    passwordField.style.boxShadow = successBox;
  }

  if (!steamId || isNaN(steamId)) {
    steamIdField.style.boxShadow = errorBox;
  } else {
    steamIdField.style.boxShadow = successBox;
  }

  if (!zipcode || zipcode.length < 5 || zipcode.length > 6) {
    zipCodeField.style.boxShadow = errorBox;
  } else {
    zipCodeField.style.boxShadow = successBox;
  }

  if (username && password) {
    const response = await fetch("/api/usears/d", {
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
  document.querySelector("#login-btn").addEventListener("click", (e) => {
    e.preventDefault();
  });
  document
    .querySelector("#homepage-register-btn")
    .addEventListener("click", (e) => {
      e.preventDefault();
    });
  document
    .querySelector("#stayloggedin")
    .addEventListener("click", loginFormHandler);
});
