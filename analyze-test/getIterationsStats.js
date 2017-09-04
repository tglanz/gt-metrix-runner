const Stats = require('fast-stats').Stats;

// assume all objects have same props
const getStats = objects => {
    const candidate = objects[0];
    const keys = Object.keys(candidate);

    return keys .reduce((res, key) => {
        const values = objects.map(object => object[key]);
        const stats = new Stats();

        values.forEach(value => stats.push(value));

        const range = stats.range();

        res[key] = {
            mean: stats.amean().toFixed(2),
            median: stats.median().toFixed(2),
            p95: stats.percentile(95).toFixed(2),
            p25: stats.percentile(25).toFixed(2),
            min: range[0],
            max: range[1],
            σ: stats.σ().toFixed(2)
        }

        return res;
    }, {})
}

const createExtraction = keys => object => keys.reduce((result, key) => Object.assign(result, {
    [key]: object[key]
}), {})

const extractIterationValues = createExtraction([
    'pageSizeInBytes',
    'loadTime',
    'redirectDuration',
    'backendDuration',
    'score'
])

module.exports = iterations => {
    const iterationsValues = iterations
        .map(iteration => iteration.result)
        .map(extractIterationValues);

    return getStats(iterationsValues);
}