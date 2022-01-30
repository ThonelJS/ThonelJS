const fs = require('fs');

exports.exists = () => {
    if (fs.existsSync('./content/index.md'))
        return true;
    return false;
}

exports.read = () => {
    const content = fs
        .readFileSync(`./content/index.md`)
        .toString();

    return content;
};