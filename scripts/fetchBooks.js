// scripts/fetchBooks.js
export async function fetchBooks(query = "bestseller", limit = 8) {
  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
    const res = await fetch(url);
    const data = await res.json();

    // Map to a consistent structure
    return data.docs.map(doc => ({
      key: doc.key, // unique key
      title: doc.title,
      author: doc.author_name ? doc.author_name[0] : "Unknown Author",
      coverId: doc.cover_i || null
    }));
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
}