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

var util          = require('./util');
var assertionFail = require('./assertion-fail');
var api           = require('./api');

module.exports = {

  //
  // Fluent readability and expressions helpers
  //

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called.
   * @see given
   * @see when
   * @see if
   * @see and
   * @return {Object} The current instance
   */
  case: function() {

    if (arguments.length) {

      for (var arg in arguments) {

        if (typeof arguments[arg] === 'function') {
          arguments[arg].call(api.$di._container);
        }
      }
    }

    return api;
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called.
   * @see case
   * @see when
   * @see then
   * @return {Object} The current instance
   */
  given: function() {
    return this.case.apply(this, arguments);
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called.
   * @see case
   * @see given
   * @see then
   * @return {Object} The current instance
   */
  when: function() {
    return this.case.apply(this, arguments);
  },


  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called.
   * @see case
   * @see given
   * @see when
   * @return {Object} The current instance
   */
  then: function() {
    return this.case.apply(this, arguments);
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   *
   * @see and
   * @return {Object} The current instance
   */
  get if () {
    return util.chain.call(this, this.case);
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   *
   * @see if
   * @return {Object} The current instance
   */
  get and() {
    return util.chain.call(this, this.case);
  },

  //
  // Helpers
  //

  /**
   * Execute the given function after a specified number of milliseconds.
   *
   * @param  {number}   ms      The number of milliseconds to wait before
   *                            executing the code.
   * @param  {function} fn      The function that will be executed.
   * @return {Object}           The current instance.
   */
  wait: function wait(timeout, fn) {

    setTimeout(function() {
      fn.call(api.$di._container);
    }, timeout);

    return api;
  },

  /**
   * Dump the arguments.
   * If no argument is passed, the actual tested value is dumped.
   * @return {Object} The current control flow.
   */
  dump: function dump() {

    var br    = '======================';
    var br2   = '______________________';
    var space = '                             ';
    var n     = 0;

    console.log('\n' + br + ' Unit.js dump: start ' + br);

    if (arguments.length === 0) {
      console.log('\n' + br2 + br2 + br2 + '\n' + space + '[actual]\n\n');
      console.log(this.actual);
    }else{
      for (var k in arguments) {
        n++;
        console.log('\n' + br2 + br2 + br2 + '\n' + space + '[dump %s]\n\n', n);
        console.log(arguments[k]);
      }
    }
    console.log('\n' + br + ' Unit.js dump: end ' + br + '\n');

    return this;
  },

  /**
   * Fails a test.
   *
   * @example
   *   test.fail('An error message');
   *
   *   // or
   *   test.fail('An error message', 'expected value');
   *
   *   // or
   *   test.fail('An error message', 'expected value', 'actual value');
   *
   *   // or
   *   test.value('actual value')
   *     .fail();
   *
   *   // or
   *   test.value('actual value')
   *     .fail('An error message');
   *
   *   // or
   *   test.value('actual value')
   *     .fail('An error message', 'expected value');
   *
   * @throws AssertionError
   *
   * @param {string} [message]  Error message.
   * @param {mixed}  [expected] Expected value.
   * @param {mixed}  [actual]   Actual value,
   *                            by default the last value tested is used.
   * @param {mixed}  [,inspect] Value to inspect in the console
   *                            with the helper `test.dump()`.
   */
  fail: function fail(message) {

    var args    = Array.prototype.slice.call(arguments);
    var options = {
      actual: args.length >= 3 ? args[2] : this.actual
    };

    if(args.length >= 2) {
      options.expected = args[1];
    }

    if(args.length >= 4) {
      options.inspect = args.slice(3);
    }

    assertionFail(message, options);
  },

  /**
   * Stats
   * @type {Object}
   */
  stats: {
    assertions: {},
    total: {
      assertions: 0
    }
  }
};