const fs = require('fs');
const showdown = require('showdown');

// TODO: Do not use filename as title. Instead use the first h1.

const converter = new showdown.Converter();

exports.read = (name, truncate = 0, outputHtml = false) => {
    if (!name.includes('.md'))
        name = `${name}.md`;

    const content = fs
        .readFileSync(`./content/articles/${name}`)
        .toString();

    const truncated = content
        .substring(0, truncate == 0 ? content.length : truncate);

    if (outputHtml)
        return converter.makeHtml(truncated)

    return truncated;
};

exports.list = (outputHtml = false) => {
    articleList = fs.readdirSync(`./content/articles`);

    let articles = [];

    articleList.forEach(article => {
        articles.push({
            "name": article.replace('.md', ''),
            "caption": this.read(article, 200, outputHtml)
        });
    });

    return articles;
};

exports.exists = (name) => {
    console.log(name)
    if (!name.includes('.md'))
        name = `${name}.md`;

    return fs.existsSync(`./content/articles/${name}`)
};