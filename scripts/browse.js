import { fetchBooks } from "./fetchBooks.js";
import { addFavorite, isFavorite } from "./fav.js";

const grid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Load MANY books initially
loadBooks("bestseller");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) loadBooks(query);
});

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) loadBooks(query);
  }
});

async function loadBooks(query) {
  if (!grid) return;

  grid.innerHTML = `<p class="col-span-full text-center text-green-700 text-lg">Loading books...</p>`;

  try {
    const books = await fetchBooks(query, 20);

    if (books.length === 0) {
      grid.innerHTML = `<p class="col-span-full text-center text-red-500">No results found.</p>`;
      return;
    }

    renderBooks(books);

  } catch (error) {
    grid.innerHTML = `<p class="col-span-full text-center text-red-500">Failed to load books.</p>`;
    console.error(error);
  }
}

function renderBooks(books) {
  grid.innerHTML = "";

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";

    const coverImage = book.coverId
      ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
      : `<div class="h-48 bg-green-100 rounded mb-4"></div>`;

    card.innerHTML = `
      ${book.coverId ? `<img src="${coverImage}" class="h-48 w-full object-cover rounded mb-4">` : coverImage}
      <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${book.author}</p>
      <button class="fav-btn mt-2 w-full py-2 rounded flex items-center justify-center gap-2 text-white ${
        isFavorite(book) ? "bg-yellow-500" : "bg-green-600 hover:bg-green-700"
      }">
        <span class="heart-icon">${isFavorite(book) ? "❤️" : "🤍"}</span>
        <span class="fav-text">${isFavorite(book) ? "Added" : "Add to Favorites"}</span>
      </button>
    `;

    const btn = card.querySelector(".fav-btn");
    btn.addEventListener("click", () => {
      addFavorite(book);
      btn.classList.remove("bg-green-600", "hover:bg-green-700");
      btn.classList.add("bg-yellow-500");
      btn.querySelector(".heart-icon").textContent = "❤️";
      btn.querySelector(".fav-text").textContent = "Added";
    });

    grid.appendChild(card);
  });
}