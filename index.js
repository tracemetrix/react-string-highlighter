const React = require('react');
const highlighter = require('./highlighter');

module.exports = function({
    className = 'highlight',
    children = '',
    term
}) {
    if (term === undefined || term === '') {
        return children;
    }

    return highlighter(children, term, function(match, idx) {
        return React.createElement(
            'span',
            { className, key: idx },
            match
        );
    });
};