const express = require('express');
const app = express();
const path = require('path');

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /\nSitemap: https://nikkeskillwiki.com/sitemap.xml");
});


app.use(express.static(path.join(__dirname, 'Wiki'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.png') || path.endsWith('.webp')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    }
}));

const MainRoute = require('./Wiki/MainHome/Main_home.js');
const InfoRoute = require('./Wiki/InfoPage/PassToIndex.js');

app.use('/', MainRoute);
app.use('/', InfoRoute);

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
