
const API_BASE_URL = 'https://691792d121a96359486d5b83.mockapi.io/Books'; 



async function fetchBooks() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}


async function fetchBookById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
}


async function createBook(bookData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) {
    throw new Error('Failed to create book');
  }
  return response.json();
}


function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
