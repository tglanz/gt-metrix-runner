let _args;

const mandatoryArguments = [
    'email',
    'apiKey',
    'url'
]

module.exports = () => {
    if (_args){
        return _args;
    }

    args = require('minimist')(process.argv.slice(2));

    const missingArguments = mandatoryArguments.filter(mandatoryArg => !args.hasOwnProperty(mandatoryArg))
    if (missingArguments.length > 0){
        throw new Error(`runOptions: missing mandatory arguments: ${missingArguments.join(', ')}`)
    }

    if (!Array.isArray(args.url)){
        args.url = [ args.url ];
    }

    _args = args;
    return _args;
}