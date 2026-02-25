// scripts/index.js
import { fetchBooks } from "./fetchBooks.js";
import { updateFavButton } from "./fav.js";

const container = document.getElementById("bookGrid");

async function loadHomeBooks() {
  if (!container) return;
  container.innerHTML = `<p class="col-span-full text-center text-green-700">Loading...</p>`;

  const books = await fetchBooks("bestseller", 8);
  container.innerHTML = "";

  if (!books || books.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-red-500">No books found.</p>`;
    return;
  }

  books.forEach(book => renderBook(book, container));
}

function renderBook(book, container) {
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";

  const coverImage = book.coverId
    ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
    : null;

  card.innerHTML = `
    ${coverImage ? `<img src="${coverImage}" class="h-48 w-full object-cover rounded mb-4">` 
                  : `<div class="h-48 bg-green-100 rounded mb-4"></div>`}
    <h3 class="font-semibold text-lg mb-1">${book.title}</h3>
    <p class="text-sm text-gray-600">${book.author}</p>
    <button class="fav-btn px-3 py-2 rounded mt-3 text-white flex items-center justify-center gap-2">
      <span class="heart-icon">🤍</span>
      <span class="fav-text">Add to Favorites</span>
    </button>
  `;
  
  container.appendChild(card);

  const btn = card.querySelector(".fav-btn");
  updateFavButton(book, btn);
}

loadHomeBooks();