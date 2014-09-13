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

/* jshint strict: false */// must.AssertionError() uses `arguments.callee.caller`


var must    = require('must');
var inspect = require('must/lib/inspect');
var api     = require('./api');

/**
 * Throws an AssertionError
 *
 * @param  {string} message Error message.
 * @param  {object} [options]
 *   * expected {string} Expected value.
 *   * actual   {mixed}  Actual value.
 *   * inspect  {array}  Value to inspect in the console
 *                       with the helper `test.dump()`.
 * @throws AssertionError
 */
module.exports = function assertionFail(message, options) {

  message = message || 'test.fail()';
  options = options || {};

  if('expected' in options) {

    options.expected = inspect(options.expected);

    if(typeof options.actual === 'undefined') {
      message += ' | expected: ' + options.expected;
    }
  }

  if(options.inspect) {

    var inspects = [];

    for(var i in options.inspect) {
      inspects.push(inspect(options.inspect[i]));
    }

    api.dump.apply(api, inspects);

    delete options.inspect;
  }

  throw new must.AssertionError(message, options);
};