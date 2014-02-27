/**
 * This file is part of the Unit.js testing framework.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 * 
 * For the full copyright and license information, please view 
 * the LICENSE file that was distributed with this source code 
 * or visit {@link http://unitjs.com|Unit.js}.
 *
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 */

'use strict';

var 
  RawCommonApi  = require('../common_api'), // constructor
  rawAssertions = require('../assertions'), // object
  _             = require('noder.io')._
;

/**
 * Expose all assertions
 * @type {function}
 * @param  {mixed} actual Actual value tested
 * @return {Object}        The current asserter
 */
module.exports = function BoolAsserter(actual) {

  // actual value tested
  this.actual = actual;

  // assertions with the current context
  var assertions = rawAssertions.call(this, actual);

  // Build the common API with the current context
  var CommonApi = RawCommonApi.bind(this);
  var commonApi = new CommonApi();

  // provides the common API in the current asserter
  for (var method in commonApi) {
    this[method] = commonApi[method];
  }

  // assert the type
  assertions.isBool(this.actual);

  // provides the assertions to the current asserter  
  var useAssertions = ['isTrue', 'isNotTrue', 'isFalse', 'isNotFalse'];
  var asserterAssertions = _.pick(assertions, useAssertions);

  for (var method in asserterAssertions) {
    this[method] = asserterAssertions[method];
  }

  // return this asserter
  return this;
};