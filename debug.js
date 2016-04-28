var v8 = require('v8');
v8.setFlagsFromString('--use_strict');
v8.setFlagsFromString('--harmony_destructuring');

// expected:
// ['h', '{ell}', 'o w', '{orl}', 'd']
require('./highlighter')('hello world', 'ell orl', words => `{${words}}`);