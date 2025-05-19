const express = require('express');
const app = express.Router();
const path = require('path');

app.get('/', (req, res) => {
    res.redirect('/MainHome');
});

app.get('/MainHome', (req, res) => {
    res.sendFile(path.join(__dirname, 'Main_home.html'));
});

module.exports = app;