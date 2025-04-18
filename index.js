const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'MainHome')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'MainHome', 'Main_home.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
