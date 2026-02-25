// scripts/favoritesPage.js
import { getFavorites, removeFavorite } from "./fav.js";

const container = document.getElementById("favoritesContainer");

function loadFavorites() {
  const favorites = getFavorites();

  // Clear the container
  container.innerHTML = "";

  if (favorites.length === 0) {
    container.innerHTML = `
      <p class="col-span-full text-center text-gray-500 py-20">
        You have not added any favorite books yet.
      </p>
    `;
    return;
  }

  favorites.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";

    const coverImage = book.coverId
      ? `<img src="https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg" class="h-48 w-full object-cover rounded mb-4">`
      : `<div class="h-48 bg-green-100 rounded mb-4"></div>`;

    card.innerHTML = `
      ${coverImage}
      <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${book.author}</p>
      <button class="remove-fav-btn mt-2 w-full py-2 rounded bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2">
        <span class="heart-icon">❤️</span>
        <span>Remove from Favorites</span>
      </button>
    `;

    // Remove from favorites on button click
    card.querySelector(".remove-fav-btn").addEventListener("click", () => {
      removeFavorite(book.key);
      loadFavorites(); // reload after removal
    });

    container.appendChild(card);
  });
}

// Load favorites on page load
loadFavorites();