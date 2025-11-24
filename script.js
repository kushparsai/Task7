const API_URL = "https://jsonplaceholder.typicode.com/users";

const usersEl = document.getElementById("users");
const statusEl = document.getElementById("status");
const errorEl = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");
const fetchBtn = document.getElementById("fetchBtn");

async function fetchUsers() {
  usersEl.innerHTML = "";
  errorEl.style.display = "none";
  statusEl.textContent = "Fetching users...";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }

    const data = await res.json();

    statusEl.textContent = `Loaded ${data.length} users`;

    data.forEach(user => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, 
                                   ${user.address.city}</p>
      `;

      usersEl.appendChild(card);
    });

  } catch (err) {
    errorEl.textContent = "Error: " + err.message;
    errorEl.style.display = "block";
    statusEl.textContent = "Failed to load users";
  }
}

reloadBtn.addEventListener("click", () => {
  location.reload();
});

fetchBtn.addEventListener("click", fetchUsers);
window.addEventListener("load", fetchUsers);
