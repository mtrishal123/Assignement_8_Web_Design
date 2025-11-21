document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('editForm');
  const id = getQueryParam('id');

  if (!id) {
    document.getElementById('formError').textContent = 'No book ID provided.';
    return;
  }

  // Load existing book data
  try {
    const book = await fetchBookById(id);

    document.getElementById('title').value = book.title || '';
    document.getElementById('author').value = book.author || '';
    document.getElementById('year').value = book.year || '';
    document.getElementById('pages').value = book.pages || '';
    document.getElementById('genre').value = book.genre || '';
  } catch (err) {
    document.getElementById('formError').textContent = 'Error loading book data.';
    return;
  }

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessages();

    const title = form.title.value.trim();
    const author = form.author.value.trim();
    const yearValue = form.year.value.trim();
    const pagesValue = form.pages.value.trim();
    const genre = form.genre.value.trim();

    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
    let valid = true;

    // Validation
    if (title.length < 2) {
      showError('titleError', 'Title must be at least 2 characters.');
      valid = false;
    }
    if (author.length < 2) {
      showError('authorError', 'Author must be at least 2 characters.');
      valid = false;
    }
    const yearNum = parseInt(yearValue, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 1500 || yearNum > currentYear) {
      showError('yearError', `Year must be between 1500 and ${currentYear}.`);
      valid = false;
    }
    const pagesNum = parseInt(pagesValue, 10);
    if (isNaN(pagesNum) || pagesNum <= 0) {
      showError('pagesError', 'Pages must be a positive number.');
      valid = false;
    }
    if (genre.length < 3) {
      showError('genreError', 'Genre must be at least 3 characters.');
      valid = false;
    }

    if (!valid) {
      formError.textContent = 'Please correct the errors and try again.';
      return;
    }

    // Update API (PUT)
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author,
          year: yearNum,
          pages: pagesNum,
          genre
        }),
      });

      formSuccess.textContent = 'Book updated successfully!';
    } catch (err) {
      formError.textContent = 'Failed to update book. Please try again.';
    }
  });

  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  function clearMessages() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('.success').forEach(el => el.textContent = '');
  }
});
