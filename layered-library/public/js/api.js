// API Client for Library Management
class LibraryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    // Get all books
    async getAllBooks(status = null) {
        try {
            const base = `${this.baseURL}/books`;
            const url = status ? `${base}?status=${status}` : base;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch books');

            const data = await response.json();

            // ถ้า backend ส่ง { books, statistics } มาแล้ว ใช้เลย
            if (data.books && data.statistics) {
                return data;
            }

            // ถ้า backend ส่ง array มา ต้องคำนวณเอง
            const books = Array.isArray(data) ? data : [];
            const statistics = {
                total: books.length,
                available: books.filter(b => b.status === 'available').length,
                borrowed: books.filter(b => b.status === 'borrowed').length
            };

            return { books, statistics };
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }
    
    async getBookById(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        return await response.json();
    }
    
    async createBook(bookData) {
        const response = await fetch(`${this.baseURL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async updateBook(id, bookData) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async borrowBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/borrow`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async returnBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/return`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async deleteBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
}

// Initialize API client
const api = new LibraryAPI('/api');