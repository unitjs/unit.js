/**
 * This file is part of the Unit.js testing framework.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view
 * the LICENSE file distributed with this source code
 * or visit http://unitjs.com.
 *
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 */

'use strict';

var nativeAssert = require('assert');
var stats        = require('./helpers').stats;
var methods      = [
 'ok', 'fail', 'equal', 'notEqual', 'deepEqual', 'notDeepEqual', 'strictEqual',
 'notStrictEqual', 'throws', 'doesNotThrow', 'ifError'
];

function countAssertion(assertion) {

  assertion = assertion ? 'assert.' + assertion : 'assert';

  if(typeof stats.assertions[assertion] == 'undefined') {
    stats.assertions[assertion] = 0;
  }

  stats.assertions[assertion]++;
  stats.total.assertions++;
}

function assert(value, message) {
  countAssertion();
  return nativeAssert(value, message);
}


methods.forEach(function(method) {

  assert[method] = function() {
    countAssertion(method);
    return nativeAssert[method].apply(assert, arguments);
  };
});

module.exports = assert;
