const fs = require('fs');
const showdown = require('showdown');
const pug = require('pug');

const articles = require('./articles');
const frontpage = require('./frontpage');
const about = require('./about');

converter = new showdown.Converter();

fs.rmSync('./docs', { recursive: true, force: true });
fs.mkdirSync('./docs');

const info = JSON.parse(fs.readFileSync('./content/info.json'));

// About page
const aboutHtml = pug.renderFile('./views/about.pug', {
    info,
    content: converter.makeHtml(about.read())
});

fs.writeFileSync('./docs/about.html', aboutHtml);

// Frontpage
if (frontpage.exists()) {
    const frontpageHtml = pug.renderFile('./views/index.pug', {
        info,
        content: converter.makeHtml(frontpage.read())
    });
    fs.writeFileSync('./docs/index.html', frontpageHtml);
} else {
    const frontpageHtml = pug.renderFile('./views/list.pug', {
        info,
        articles: articles.list()
    });
    fs.writeFileSync('./docs/index.html', frontpageHtml);
}

// Blog
const blogHtml = pug.renderFile('./views/list.pug', {
    info,
    articles: articles.list()
});

fs.writeFileSync('./docs/blog.html', blogHtml);


// Individual articles
console.log(`Generating pages for ${articles.list().length} articles...`);

articles.list().forEach((article) => {
    const articleHtml = pug.renderFile('./views/article.pug', {
        info,
        content: articles.read(article.name, 0, true),
        title: article.name
    });

    fs.writeFileSync(`./docs/${article.name}.html`, articleHtml);
});