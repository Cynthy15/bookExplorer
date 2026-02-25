// scripts/categories.js
import { fetchBooks } from "./fetchBooks.js";
import { addFavorite, removeFavorite, isFavorite, updateFavButton } from "./fav.js";

const buttons = document.querySelectorAll(".category-btn");
const grid = document.getElementById("categoryBooks");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.textContent.trim();
    loadCategoryBooks(category);
  });
});

async function loadCategoryBooks(category) {
  if (!grid) return;

  grid.innerHTML = `
    <p class="col-span-full text-center text-green-700 text-lg">
      Loading ${category} books...
    </p>
  `;

  try {
    const books = await fetchBooks(category);

    if (!books || books.length === 0) {
      grid.innerHTML = `
        <p class="col-span-full text-center text-red-500">
          No books found for this category.
        </p>
      `;
      return;
    }

    grid.innerHTML = "";

    books.forEach(book => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";

      const coverImage = book.coverId
        ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
        : null;

      card.innerHTML = `
        ${coverImage
          ? `<img src="${coverImage}" class="h-48 w-full object-cover rounded mb-4">`
          : `<div class="h-48 bg-green-100 rounded mb-4"></div>`}

        <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
        <p class="text-sm text-gray-600">${book.author}</p>

        <button class="fav-btn mt-4 w-full py-2 rounded flex items-center justify-center gap-2">
          <span class="heart-icon">🤍</span>
          <span class="fav-text">Add to Favorites</span>
        </button>
      `;

      // Update button state and add favorite toggle
      const favBtn = card.querySelector(".fav-btn");
      updateFavButton(book, favBtn);

      grid.appendChild(card);
    });

  } catch (error) {
    grid.innerHTML = `
      <p class="col-span-full text-center text-red-500">
        Failed to load books.
      </p>
    `;
    console.error(error);
  }
}