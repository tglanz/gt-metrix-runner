// if the string contains ?
//      append &key=value
// else 
//      append ?key=value
module.exports = (str, key, value) => {
    let splitter = '?';
    if (str.indexOf(splitter) > 0){
        splitter = '&';
    }

    return `${str}${splitter}${key}=${value}`;
}