const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    console.error("Failed to log out");
  }
};

document.querySelector("#logout-btn").addEventListener("click", logout);
