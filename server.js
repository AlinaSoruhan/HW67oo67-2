const express = require('express');

const app = express();
const PORT = 3000;

app.get('/67', (req, res) => {
    res.json({
        timestamp: new Date()
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});