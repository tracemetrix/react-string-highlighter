const test = require('tape');
const highlighter = require('./highlighter');
const wrap = words => `{${words}}`;

test('wraping callback', function(assert) {
    assert.plan(2);

    highlighter('foo', 'foo', function(match, index) {
        assert.equal(match, 'foo', `callback is passed a "match" string`);
        assert.equal(index, 0, `callback is passed an index`);
    });

    assert.end();
});

test('wraping basics', function(assert) {
    assert.deepEqual(
        highlighter('foo bar baz', 'bar', wrap),
        ['foo ', '{bar}', ' baz'],
        `wraps {bar}`
    );
    assert.deepEqual(
        highlighter('foo bar baz', 'zzz', wrap),
        ['foo bar baz'],
        `wraps nothing`
    );
    assert.deepEqual(
        highlighter('foo bar baz', 'b', wrap),
        ['foo ', '{b}', 'ar ', '{b}', 'az'],
        `wraps {b}s`
    );

    assert.end();
});

test('wraping:advanced', function(assert) {
    assert.deepEqual(
        highlighter('foo $#@ baz', '$', wrap),
        ['foo ', '{$}', '#@ baz'],
        'wraps special characters'
    );

    assert.deepEqual(
        highlighter('  foo  ', 'foo', wrap),
        ['  ', '{foo}', '  '],
        `keeps original string's spacing`
    );

    assert.deepEqual(
        highlighter('foo', ' foo ', wrap),
        ['{foo}'],
        `trims the highlighting string`
    );

    assert.deepEqual(
        highlighter(`
foo
`, 'foo', wrap),
        ['\n', '{foo}', '\n'],
        `new lines are maintained`
    );

    assert.end();
});

test('highlighting multipart', function(assert) {
    assert.deepEqual(
        highlighter('hello world', 'ell orl', wrap),
        ['h', '{ell}', 'o w', '{orl}', 'd'],
        `highlights {ell} and {orl}`
    );

    assert.end();
});