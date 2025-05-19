const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:dataName', (req, res) => {
    res.sendFile(path.join(__dirname, '/InfoPage.html'));
});

module.exports = router;
