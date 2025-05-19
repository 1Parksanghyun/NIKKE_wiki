const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'Wiki')));

const MainRoute = require('./Wiki/MainHome/Main_home.js');
const InfoRoute = require('./Wiki/InfoPage/PassToIndex.js');

app.use('/', MainRoute);
app.use('/', InfoRoute);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
