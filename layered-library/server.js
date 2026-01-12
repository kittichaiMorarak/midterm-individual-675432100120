const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
const bookRoutes = require('./presentation/routes/book.routes');
app.use('/api/books', bookRoutes);

// Serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Choose another PORT or stop the process using it.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

function shutdown(signal) {
  console.log(`Received ${signal}. Shutting down server...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
  // Force exit if close doesn't complete in time
  setTimeout(() => process.exit(1), 5000);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));