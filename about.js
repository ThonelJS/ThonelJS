const fs = require('fs');

exports.exists = () => {
    if (fs.existsSync('./content/about.md'))
        return true;
    return false;
}

exports.read = () => {
    const content = fs
        .readFileSync(`./content/about.md`)
        .toString();

    return content;
};