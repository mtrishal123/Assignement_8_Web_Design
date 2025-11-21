document.addEventListener('DOMContentLoaded', async () => {
  const listElement = document.getElementById('bookList');
  const errorElement = document.getElementById('listError');

  try {
    const books = await fetchBooks();

    if (!Array.isArray(books) || books.length === 0) {
      listElement.innerHTML = '<li>No books found.</li>';
      return;
    }

    books.forEach(book => {
      const li = document.createElement('li');

      // Title Link (View Book Details)
      const link = document.createElement('a');
      link.href = `book.html?id=${encodeURIComponent(book.id)}`;
      link.textContent = book.title || 'Untitled';

      // Meta Author
      const meta = document.createElement('span');
      meta.textContent = book.author ? `by ${book.author}` : '';

      // Edit Button
      const editBtn = document.createElement('a');
      editBtn.href = `edit.html?id=${encodeURIComponent(book.id)}`;
      editBtn.textContent = 'Edit';
      editBtn.className = 'btn';

      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = async () => {
        const confirmDelete = confirm(`Are you sure you want to delete "${book.title}"?`);
        if (!confirmDelete) return;

        try {
          await fetch(`${API_BASE_URL}/${book.id}`, { method: 'DELETE' });
          window.location.reload();
        } catch (err) {
          alert('Error deleting book. Please try again.');
        }
      };

      li.appendChild(link);
      li.appendChild(meta);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      listElement.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    errorElement.textContent = 'Error loading books from the API.';
  }
});
