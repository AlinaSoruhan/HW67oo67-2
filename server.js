const express = require('express');

const app = express();
const PORT = 6767;

app.get('/67', (req, res) => {
    res.json({
        timestamp: new Date()
    });
});


app.get('/health', (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get('/stats', (req, res) => {
  res.status(200).json({
    uptime: Math.floor(process.uptime()),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



