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

var _                = require('lodash');

// constructor
var RawControlFlow     = require('../control-flow');

// object
var rawAssertions    = require('../assertions');

// array
var commonAssertions = require('../common-assertions');

var util             = require('../util');
var api              = require('../api');
var actual;
var message;

// list the assertions to the current asserter (specific and common)
var useAssertions = commonAssertions.concat([

  // types
  'isType', 'isNotType', 'isObject', 'isArray', 'isString', 'isNumber',
  'isBool', 'isBoolean', 'isNull', 'isUndefined',

  // types augmented
  'isRegExp', 'isNotRegExp', 'isDate', 'isNotDate',
  'isArguments', 'isNotArguments', 'isEmpty', 'isNotEmpty',

  // quantifications
  'hasLength', 'hasNotLength',

  // containers
  'isInstanceOf', 'isNotInstanceOf', 'isEnumerable', 'isNotEnumerable',
  'isFrozen', 'isNotFrozen', 'hasProperty', 'hasNotProperty',
  'hasOwnProperty', 'hasNotOwnProperty', 'hasProperties', 'hasNotProperties',
  'hasOwnProperties', 'hasKey', 'notHasKey', 'hasKeys', 'notHasKeys',
  'hasValue', 'notHasValue', 'hasValues', 'notHasValues',
  'contains', 'notContains',

  // string
  'startsWith', 'notStartsWith', 'endsWith', 'notEndsWith'
]);

/**
 * Check expected message
 * @param  {string|RegExp} expected The expected message
 * @return {bool}          true is success, false is not
 */
function expectedMessage(expected) {

  if (!expected) {
    return false;
  }

  var actual_message = message === undefined ? actual : message;

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {

    return expected.test(actual_message);
  }

  return expected === actual_message;
}

/**
 * Asserter
 * @type {Object}
 */
var asserter = {

  isError: function(){

    return this.isInstanceOf(Error);
  },

  match: function(expected){

    // cond: fn
    var _fnNotMatch = typeof expected == 'function'
      && expected(actual, message) !== true;

    // cond: other value
    var _valueNotMatch = typeof expected != 'function'
      && !expectedMessage(expected);

    if(_fnNotMatch || _valueNotMatch){
      throw new Error('exception has not the expected value (' + expected+ ')');
    }

    return this;
  },

  notMatch: function(expected){

    // cond: fn
    var _fnMatch = typeof expected == 'function'
      && expected(actual, message);

    // cond: other value
    var _valueMatch = typeof expected != 'function'
      && expectedMessage(expected);

    if(_fnMatch || _valueMatch){
      throw new Error('exception has the expected value (' + expected+ ')');
    }

    return this;
  },

  hasMessage: function(expected){

    return this.match(expected);
  }
};

/**
 * Expose all assertions
 * @type {function}
 * @param  {function} trigger A trigger function that throws an exception
 * @return {Object}        The this test cases
 */
module.exports = function ExceptionAsserter(trigger){

  var isThrowed;

  // reset preview value
  actual = undefined;

  try {
    api.$apply(trigger);
  }catch (e){

    // actual exception tested
    this.actual = actual = e;

    isThrowed = true;
  }

  if(!isThrowed){
    api.fail('Missing expected exception');
  }

  if(actual && actual.message !== undefined){

    message = actual.message;

  }else if(typeof actual == 'string'){

    message = actual;
  }

  // assertions with the current context
  var assertions = rawAssertions.call(this, actual);

  // Build the common API with the current context
  var ControlFlow = RawControlFlow.bind(this);
  var commonApi = new ControlFlow();

  // provides the common API in the current asserter
  for (var method in commonApi) {
    this[method] = commonApi[method];
  }

  // provides the assertions to the current asserter (specific and common)
  var asserterAssertions = util.merge(
    _.pick(assertions, useAssertions), asserter
  );

  for (var method in asserterAssertions) {
    this[method] = asserterAssertions[method];
  }

  // return this asserter
  return this;
};