document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('createForm');

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessages();

        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const yearValue = document.getElementById('year').value.trim();
        const pagesValue = document.getElementById('pages').value.trim();
        const genre = document.getElementById('genre').value.trim();

        const formError = document.getElementById('formError');
        const formSuccess = document.getElementById('formSuccess');

        let valid = true;

        // Simple validation rules
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
          formError.textContent = 'Please fix the errors above and try again.';
          return;
        }

        try {
          await createBook({
            title,
            author,
            year: yearNum,
            pages: pagesNum,
            genre,
          });
          formSuccess.textContent = 'Book created successfully! Go back to the homepage to see it in the list.';
          form.reset();
        } catch (err) {
          console.error(err);
          formError.textContent = 'There was an error creating the book. Please try again.';
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