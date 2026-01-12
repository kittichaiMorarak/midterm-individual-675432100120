// Main Application Logic for Library Management
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    setupEventListeners();
    loadBooks();
});

// Setup event listeners
function setupEventListeners() {
    const addBtn = document.getElementById('add-btn');
    const closeBtn = document.querySelector('.close');
    const cancelBtn = document.getElementById('cancel-btn');
    const bookForm = document.getElementById('book-form');
    
    console.log('Setting up event listeners...');
    console.log('Add button:', addBtn);
    
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            console.log('Add button clicked!');
            showAddModal();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    if (bookForm) {
        bookForm.addEventListener('submit', handleSubmit);
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterBooks(filter);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('book-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Load books
async function loadBooks(status = null) {
    try {
        showLoading();
        
        const data = await api.getAllBooks(status);
        
        displayBooks(data.books);
        updateStatistics(data.statistics);
        
        hideLoading();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('book-list').innerHTML = `
            <div class="no-books">
                ❌ Failed to load books: ${error.message}
            </div>
        `;
        hideLoading();
    }
}

// Display books
function displayBooks(books) {
    const container = document.getElementById('book-list');
    
    if (!books || books.length === 0) {
        container.innerHTML = '<div class="no-books">📚 No books found. Click "Add New Book" to get started!</div>';
        return;
    }
    
    container.innerHTML = books.map(book => createBookCard(book)).join('');
}

// Create book card HTML
function createBookCard(book) {
    return `
        <div class="book-card">
            <h3>${escapeHtml(book.title)}</h3>
            <p class="author">👤 ${escapeHtml(book.author)}</p>
            <p class="isbn">📖 ISBN: ${escapeHtml(book.isbn)}</p>
            <span class="status-badge status-${book.status}">
                ${book.status === 'available' ? '✅ Available' : '📤 Borrowed'}
            </span>
            <div class="actions">
                <button class="btn btn-warning" onclick="editBook(${book.id})">✏️ Edit</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">🗑️ Delete</button>
                ${book.status === 'available' 
                    ? `<button class="btn btn-success" onclick="borrowBook(${book.id})">📤 Borrow</button>`
                    : `<button class="btn btn-primary" onclick="returnBook(${book.id})">📥 Return</button>`
                }
            </div>
        </div>
    `;
}

// Update statistics
function updateStatistics(stats) {
    document.getElementById('stat-available').textContent = stats.available;
    document.getElementById('stat-borrowed').textContent = stats.borrowed;
    document.getElementById('stat-total').textContent = stats.total;
}

// Filter books
function filterBooks(status) {
    currentFilter = status;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === status) {
            btn.classList.add('active');
        }
    });
    
    loadBooks(status === 'all' ? null : status);
}

// Show/hide loading
function showLoading() {
    const loading = document.getElementById('loading');
    const bookList = document.getElementById('book-list');
    if (loading) loading.style.display = 'block';
    if (bookList) bookList.style.display = 'none';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    const bookList = document.getElementById('book-list');
    if (loading) loading.style.display = 'none';
    if (bookList) bookList.style.display = 'grid';
}

// Modal functions
function showAddModal() {
    console.log('Opening modal...');
    const modal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('modal-title');
    const bookForm = document.getElementById('book-form');
    const bookId = document.getElementById('book-id');
    
    if (modalTitle) modalTitle.textContent = 'Add New Book';
    if (bookForm) bookForm.reset();
    if (bookId) bookId.value = '';
    if (modal) {
        modal.style.display = 'flex';
        console.log('Modal opened!');
    }
}

function closeModal() {
    console.log('Closing modal...');
    const modal = document.getElementById('book-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Form submit
async function handleSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value
    };
    
    try {
        if (id) {
            await api.updateBook(id, bookData);
            alert('✅ Book updated successfully!');
        } else {
            await api.createBook(bookData);
            alert('✅ Book added successfully!');
        }
        
        closeModal();
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

// Edit book
async function editBook(id) {
    try {
        const book = await api.getBookById(id);
        
        document.getElementById('modal-title').textContent = 'Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        
        document.getElementById('book-modal').style.display = 'flex';
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

// Borrow book
async function borrowBook(id) {
    if (!confirm('Do you want to borrow this book?')) return;
    
    try {
        await api.borrowBook(id);
        alert('✅ Book borrowed successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

// Return book
async function returnBook(id) {
    if (!confirm('Do you want to return this book?')) return;
    
    try {
        await api.returnBook(id);
        alert('✅ Book returned successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

// Delete book
async function deleteBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
        await api.deleteBook(id);
        alert('✅ Book deleted successfully!');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}