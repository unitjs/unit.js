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

/**
 * Tests that an exception thrown and is an instance of Error (or inherited).
 */
'use strict';

var ExceptionAsserter = require('./exception');

/**
 * Expose all assertions
 * @type {function}
 * @param  {mixed} value Actual value tested
 * @return {Object}        The current test cases
 */
module.exports = function ErrorAsserter(trigger){

  var Exception = ExceptionAsserter.bind(this);
  var exception = new Exception(trigger);
  var error     = exception.isError();

  // detele inappropriate methods
  [
    // types
    'isType', 'isNotType', 'isObject', 'isArray', 'isString',
    'isNumber', 'isBool', 'isBoolean', 'isNull', 'isUndefined',

    // types augmented
    'isRegExp', 'isNotRegExp', 'isDate', 'isNotDate', 'isArguments',
    'isNotArguments', 'isEmpty', 'isNotEmpty',

    // quantification
    'hasLength', 'hasNotLength',

    // containers
    'hasProperties', 'hasNotProperties', 'hasOwnProperties',
    'hasKeys', 'notHasKeys',
    'hasValue', 'notHasValue', 'hasValues', 'notHasValues',
    'contains', 'notContains',

    // string
    'startsWith', 'notStartsWith', 'endsWith', 'notEndsWith'

  ].map(function(method){
    delete error[method];
  });

  for(var method in error){
    this[method] = error[method];
  }

  return this;
};