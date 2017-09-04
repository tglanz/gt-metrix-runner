let _args;

const mandatoryArguments = [
    'sourceFile'
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

    _args = args;
    return _args;
}