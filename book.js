document.addEventListener('DOMContentLoaded', async () => {
  const id = getQueryParam('id');
  const errorElement = document.getElementById('detailError');

  if (!id) {
    errorElement.textContent = 'No book ID provided in the URL.';
    return;
  }

  try {
    const book = await fetchBookById(id);

    document.getElementById('bookTitle').textContent = book.title || 'Untitled';
    document.getElementById('bookAuthor').textContent = book.author ? `Author: ${book.author}` : '';
    document.getElementById('bookYear').textContent = book.year ? `Year: ${book.year}` : '';
    document.getElementById('bookPages').textContent = book.pages ? `Pages: ${book.pages}` : '';
    document.getElementById('bookGenre').textContent = book.genre ? `Genre: ${book.genre}` : '';
  } catch (err) {
    console.error(err);
    errorElement.textContent = 'Error loading book details from the API.';
  }
});
