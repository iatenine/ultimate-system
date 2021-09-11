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
  // TODO: Add a comment describing the functionality of this statement
  event.preventDefault();

  // TODO: Add a comment describing the functionality of these expressions
  const username = document.querySelector("#userEmail").value.trim();
  const password = document.querySelector("#registerPassword").value.trim();
  const steamID = document.querySelector("#steamUID").value.trim();

  if (username && password) {
    // TODO: Add a comment describing the functionality of this expression
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ username, password, steamID }),
      headers: { "Content-Type": "application/json" },
    });

    alert("response");
  }
};

$(document).ready(function () {
  document
    .querySelector("#registerID")
    .addEventListener("click", registerHandler);
  document
    .querySelector("#stayloggedin")
    .addEventListener("click", loginFormHandler);
});
