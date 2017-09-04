const path = require('path');
const fs = require('fs');
const bb = require('bluebird');
bb.promisifyAll(fs);

module.exports = async (directory, results) => {
    await fs.mkdirAsync(directory);
    const allPath = path.join(directory, 'all.json');
    await fs.writeFileAsync(allPath, JSON.stringify(results, null, 4));
}