const mysql = require('mysql2');
const express = require('express');
const cors = require('cors'); // Import CORS

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '07052003',
  database: 'cinema',
  port: 3307
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Kết nối đến MySQL thất bại:', err);
    return;
  }
  console.log('Kết nối đến MySQL thành công!');
});

const app = express();
const PORT = 4999;

// Enable CORS for all routes
app.use(cors());

// Define a route to get data based on room_id
app.get('/api/seats', (req, res) => {
  const roomId = req.query.room_id; // Get room_id from query parameters
  let query = 'SELECT * FROM seats';

  if (roomId) {
    query += ' WHERE room_id = ?'; // Filter by room_id
  }

  connection.query(query, [roomId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
