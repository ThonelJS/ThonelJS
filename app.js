const fs = require('fs');
const express = require('express');
const showdown = require('showdown');

const articles = require('./articles');
const frontpage = require('./frontpage');
const about = require('./about');

const app = express();
app.set('view engine', 'pug');
const port = 8000;
const converter = new showdown.Converter();

if (about.exists()) {
    app.locals.about = true;
}

app.locals.info = JSON.parse(fs.readFileSync('./content/info.json'));

app.get('/', (req, res) => {
    if (frontpage.exists()) {
        const html = converter.makeHtml(frontpage.read());
        return res.render('index', { content: html });
    }

    return res.render('list', { articles: articles.list() });
});

app.get('/blog.html', (req, res) => {
    return res.render('list', { articles: articles.list() });
});

app.get('/about.html', (req, res) => {
    const html = converter.makeHtml(about.read());
    return res.render('about', { content: html });
});

app.get('/:article', (req, res) => {
    const article = req.params.article;
    if (articles.exists(article)) {
        const html = articles.read(article, 0, true);
        return res.render('article', { content: html, title: article });
    } else {
        const file = article;
        if (fs.existsSync(`${__dirname}/content/static/${file}`)) {
            return res.sendFile(`${__dirname}/content/static/${file}`)
        } else {
            res.redirect('/');
        }
    }
});

app.listen(port, () => {
    console.log(`Web server at http://localhost:${port}`);
});