const escapeRegExp = require('lodash/escapeRegExp');
const memoize = require('lodash/memoize');

// memoize the creation of regular expressions
const createRegex = memoize(function(str) {
    const regexString = str.trim()
        .split(' ')
        .map(segment => escapeRegExp(segment))
        .join('|');
    return new RegExp(`(${regexString})`, 'gi');
});

module.exports = function(baseString, highlight, fn) {
    // what we expect marker (below) to be after generating our markup
    const expectedLength = baseString.length;
    // the regular expression
    const regex = createRegex(highlight);
    // a container to hold the returned markup
    const markup = [];

    // we need to use the offset and the marker to push strings between
    // matches to the markup array
    let marker = 0;
    // pass the index to the fn, like we're running a loop
    let index = 0;
    baseString.replace(regex, function(match, submatches, offset) {
        if (offset > marker) {
            markup.push(
                baseString.substr(marker, offset - marker)
            );
        }

        markup.push(fn(match, index));

        marker = offset + match.length;
        index++;
    });

    // this will catch the end of the string when we've highlighted
    // performed a highlighting in the baseString, and will catch the
    // entire string if nothing was highlighted in the string
    if (marker < expectedLength) {
        markup.push(
            baseString.substr(marker, expectedLength)
        );
    }

    // send back the markup
    return markup;
};