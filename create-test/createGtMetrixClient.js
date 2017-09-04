module.exports = function(clientArgs) {
    const client = require('gtmetrix')(clientArgs)

    const bb = require('bluebird');
    bb.promisifyAll(client.locations);
    bb.promisifyAll(client.browsers);
    bb.promisifyAll(client.test);

    return client;
}