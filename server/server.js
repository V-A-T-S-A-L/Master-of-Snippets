const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Endpoint to fetch data based on the concept
app.get('/api/concept/:conceptName', (req, res) => {
    const conceptName = req.params.conceptName;
    const filePath = path.join(__dirname, 'data', `${conceptName}.json`);

    console.log(filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ message: 'Concept not found' });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
