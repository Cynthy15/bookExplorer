// scripts/fav.js
const STORAGE_KEY = "favoriteBooks";

export function getFavorites() {
  const fav = localStorage.getItem(STORAGE_KEY);
  return fav ? JSON.parse(fav) : [];
}

export function addFavorite(book) {
  const favorites = getFavorites();
  if (!favorites.find(b => b.key === book.key)) {
    favorites.push(book);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(key) {
  let favorites = getFavorites();
  favorites = favorites.filter(b => b.key !== key);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function isFavorite(book) {
  const favorites = getFavorites();
  return favorites.some(b => b.key === book.key);
}

// Update button color & text
export function updateFavButton(book, button) {
  if (!button) return;
  if (isFavorite(book)) {
    button.classList.add("bg-yellow-400");
    button.classList.remove("bg-green-600");
    button.querySelector(".heart-icon").textContent = "❤️";
    button.querySelector(".fav-text").textContent = "Added";
  } else {
    button.classList.add("bg-green-600");
    button.classList.remove("bg-yellow-400");
    button.querySelector(".heart-icon").textContent = "🤍";
    button.querySelector(".fav-text").textContent = "Add to Favorites";
  }

  button.onclick = () => {
    if (isFavorite(book)) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
    updateFavButton(book, button);
  };
}