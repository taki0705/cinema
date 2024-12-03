const express = require('express');
const connection = require('./app/database/db'); 

const app = express();
const PORT = 4000;

// Định nghĩa một route để lấy dữ liệu
app.get('/api/seats', (req, res) => {
  const query = 'SELECT * FROM seats'; 
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
