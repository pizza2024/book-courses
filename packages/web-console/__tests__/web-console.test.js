'use strict';

const webConsole = require('..');
const assert = require('assert').strict;

assert.strictEqual(webConsole(), 'Hello from webConsole');
console.info('webConsole tests passed');
