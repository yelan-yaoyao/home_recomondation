const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS (allows requests from your static page)
app.use(cors());

// API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!', success: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});