const fs = require('fs');

const {
    sourceFile
} = require('./runOptions')();

const getIterationsStats = require('./getIterationsStats');

const data = require(sourceFile);

const statsPerUrl = Object.entries(data).reduce((res, [url, entry]) => Object.assign(res, {
    [url]: getIterationsStats(entry.iterations)
}), {});

fs.writeFileSync('output/analyzed.json', JSON.stringify(statsPerUrl, null, 4))