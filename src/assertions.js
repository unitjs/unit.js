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

var _      = require('lodash');
var assert = require('assert');
var should = require('should');
var must   = require('must');
var stats  = require('./helpers').stats;
var fail   = require('./helpers').fail;


/**
 * Count an assertion
 * @param {string} assertion Assertion name
 * @param {truthy} total     Truthy to count in total
 */
function countAssertion(assertion, total) {

  if(typeof stats.assertions[assertion] == 'undefined') {
    stats.assertions[assertion] = 0;
  }

  stats.assertions[assertion]++;

  if(total) {
    stats.total.assertions++;
  }
}

// Expose all assertions
module.exports = function(actual) {

  // All assertions
  return {


    ///////////
    // Match //
    ///////////

    is: function(expected) {

      countAssertion('is', true);

      must(actual).eql(expected);

      return this;
    },

    isNot: function(expected) {

      countAssertion('isNot', true);

      must(actual).not.eql(expected);

      return this;
    },

    isEqualTo: function(expected) {

      countAssertion('isEqualTo', true);

      assert.equal(
        actual,
        expected,
        '(actual == expected), actual ' + typeof actual + ' is not equal to ' +
        'expected ' + typeof expected
      );

      return this;
    },

    isNotEqualTo: function(expected) {

      countAssertion('isNotEqualTo', true);

      assert.notEqual(
        actual,
        expected,
        '(actual != expected), actual ' + typeof actual + ' is equal to ' +
        'expected' + typeof expected
      );

      return this;
    },

    isStrictEqualTo: function(expected) {

      countAssertion('isStrictEqualTo', true);

      assert.strictEqual(
        actual,
        expected,
        '(actual === expected), actual ' + typeof actual + ' is not identical '+
        'to expected ' + typeof expected
      );

      return this;
    },

    isNotStrictEqualTo: function(expected) {

      countAssertion('isNotStrictEqualTo', true);

      assert.notStrictEqual(
        actual,
        expected,
        '(actual !== expected), actual ' + typeof actual + ' is identical to ' +
        'expected ' + typeof expected
      );

      return this;
    },

    isIdenticalTo: function(expected) {

      countAssertion('isIdenticalTo');

      return this.isStrictEqualTo(expected);
    },

    isNotIdenticalTo: function(expected) {

      countAssertion('isNotIdenticalTo');

      return this.isNotStrictEqualTo(expected);
    },

    match: function(expected) {

      countAssertion('match', true);

      if(typeof expected == 'function'){

        if(expected(actual) !== true){
          fail('actual value tested must match.');
        }

        return this;
      }

      must(actual).match(expected);

      return this;
    },

    notMatch: function(expected) {

      countAssertion('notMatch', true);

      if(typeof expected == 'function'){

        if(expected(actual)){
          fail(
            'actual value tested ('+ actual +') must not match ('+ expected +')'
          );
        }

        return this;
      }

      must(actual).not.match(expected);

      return this;
    },

    matchEach: function(expected) {

      countAssertion('matchEach', true);

      if(typeof expected == 'function'){

        if(typeof actual == 'object'){
          for(var k in actual){
            if(expected(actual[k], k) !== true){
              fail('matchEach()', actual[k], expected);
            }
          }
        }else{
          if(expected(actual) !== true){
            fail('matchEach()', actual, expected);
          }
        }

        return this;
      }

      for (var i in expected) {

        if(typeof expected[i] == 'function'){

          if(typeof actual == 'object'){
            for(var k in actual){
              if(expected[i](actual[k], k) !== true){
                fail('matchEach()', actual[k], expected[i]);
              }
            }

            continue;
          }

          if(expected[i](actual) !== true){
            fail('matchEach()', actual, expected[i]);
          }

          continue;
        }

        this.match(expected[i]);
      }

      return this;
    },

    notMatchEach: function(expected) {

      countAssertion('notMatchEach', true);

      if(typeof expected == 'function'){

        if(typeof actual == 'object'){
          for(var k in actual){
            if(expected(actual[k], k)){
              fail('notMatchEach()', actual[k], expected);
            }
          }
        }else{
          if(expected(actual)){
            fail('notMatchEach()', actual,expected);
          }
        }

        return this;
      }

      for (var i in expected) {

        if(typeof expected[i] == 'function'){

          if(typeof actual == 'object'){

            for(var k in actual){
              if(expected[i](actual[k], k)){
                fail('notMatchEach()', actual[k], expected[i]);
              }
            }

            continue;
          }

          if(expected[i](actual)){
            fail('notMatchEach()', actual, expected[i]);
          }

          continue;
        }

        this.notMatch(expected[i]);
      }

      return this;
    },

    isValid: function(expected) {

      countAssertion('isValid');

      return this.match(expected);
    },

    isNotValid: function(expected) {

      countAssertion('isNotValid');

      return this.notMatch(expected);
    },


    ///////////
    // Types //
    ///////////

    isType: function(expected) {

      countAssertion('isType', true);

      should(actual).type(expected);

      return this;
    },

    isNotType: function(expected) {

      countAssertion('isNotType', true);

      should(actual).not.type(expected);

      return this;
    },

    isObject: function() {

      countAssertion('isObject', true);

      must(actual).object();

      return this;
    },

    isArray: function() {

      countAssertion('isArray', true);

      must(actual).array();

      return this;
    },

    isFunction: function() {

      countAssertion('isFunction', true);

      must(actual).function();

      return this;
    },

    isString: function() {

      countAssertion('isString', true);

      must(actual).string();

      return this;
    },

    isNumber: function() {

      countAssertion('isNumber', true);

      must(actual).number();

      return this;
    },

    isBool: function() {

      countAssertion('isBool');

      return this.isBoolean();
    },

    isBoolean: function() {

      countAssertion('isBoolean', true);

      must(actual).boolean();

      return this;
    },

    isNull: function() {

      countAssertion('isNull', true);

      must(actual).null();

      return this;
    },

    isUndefined: function() {

      countAssertion('isUndefined', true);

      must(actual).undefined();

      return this;
    },

    /////////////////////
    // Types augmented //
    /////////////////////


    isRegExp: function() {

      countAssertion('isRegExp', true);

      must(actual).regexp();

      return this;
    },

    isNotRegExp: function() {

      countAssertion('isNotRegExp', true);

      must(actual).not.regexp();

      return this;
    },

    isDate: function() {

      countAssertion('isDate', true);

      must(actual).date();

      return this;
    },

    isNotDate: function() {

      countAssertion('isNotDate', true);

      must(actual).not.date();

      return this;
    },

    isArguments: function() {

      countAssertion('isArguments', true);

      should(actual).arguments;

      return this;
    },

    isNotArguments: function() {

      countAssertion('isNotArguments', true);

      should(actual).not.arguments;

      return this;
    },

    isTrue: function() {

      countAssertion('isTrue', true);

      must(actual).true();

      return this;
    },

    isNotTrue: function() {

      countAssertion('isNotTrue', true);

      must(actual).not.true();

      return this;
    },

    isTruthy: function() {

      countAssertion('isTruthy', true);

      must(actual).truthy();

      return this;
    },

    isNotTruthy: function() {

      countAssertion('isNotTruthy', true);

      must(actual).not.truthy();

      return this;
    },

    isFalse: function() {

      countAssertion('isFalse', true);

      must(actual).false();

      return this;
    },

    isNotFalse: function() {

      countAssertion('isNotFalse', true);

      must(actual).not.false();

      return this;
    },

    isFalsy: function() {

      countAssertion('isFalsy', true);

      must(actual).falsy();

      return this;
    },

    isNotFalsy: function() {

      countAssertion('isNotFalsy', true);

      must(actual).not.falsy();

      return this;
    },

    isEmpty: function() {

      countAssertion('isEmpty', true);

      must(actual).empty();

      return this;
    },

    isNotEmpty: function() {

      countAssertion('isNotEmpty', true);

      must(actual).not.empty();

      return this;
    },

    isNaN: function() {

      countAssertion('isNaN', true);

      if(!_.isNaN(actual)) {
        fail('Actual value tested ('+ actual +') must be NaN');
      }

      return this;
    },

    isNotNaN: function() {

      countAssertion('isNotNaN', true);

      if(_.isNaN(actual)) {
        fail('Actual value tested ('+ actual +') must be not NaN');
      }

      return this;
    },

    exists: function() {

      countAssertion('exists', true);

      must(actual).exist();

      return this;
    },

    isError: function() {

      countAssertion('isError');

      return this.throws(Error);
    },

    throws: function(constructor, expected) {

      countAssertion('throws', true);

      if (arguments.length > 2) {
        throw new Error('throws() assertion, takes maximum 2 arguments ' +
          '(constructor and expected).');
      }

      if (arguments.length == 1) {

        if (typeof constructor == 'function') {
          assert.throws(actual, constructor);
        } else {
          must(actual).throw(constructor);
        }

      } else if (arguments.length == 2) {

        must(actual).throw(constructor, expected);

      } else {
        must(actual).throw();
      }

      return this;
    },

    ////////////////////
    // Quantification //
    ////////////////////

    hasLength: function(expected) {

      countAssertion('hasLength', true);

      if(typeof actual == 'object'){

        var count = 0;

        for(var k in actual){
          count++;
        }

        if(count !== expected){
          fail(actual + 'must has length of '+ expected);
        }

      }else{
        must(actual).length(expected);
      }

      return this;
    },

    hasNotLength: function(expected) {

      countAssertion('hasNotLength', true);

      if(typeof actual == 'object'){

        var count = 0;

        for(var k in actual){
          count++;
        }

        if(count === expected){
          fail(actual + 'must has not length of ' + expected);
        }

      }else{
        must(actual).not.length(expected);
      }

      return this;
    },

    isBetween: function(begin, end) {

      countAssertion('isBetween', true);

      must(actual).between(begin, end);

      return this;
    },

    isNotBetween: function(begin, end) {

      countAssertion('isNotBetween', true);

      must(actual).not.between(begin, end);

      return this;
    },

    isBefore: function(expected) {

      countAssertion('isBefore', true);

      must(actual).before(expected);

      return this;
    },

    isAfter: function(expected) {

      countAssertion('isAfter', true);

      must(actual).after(expected);

      return this;
    },

    isGreaterThan: function(expected) {

      countAssertion('isGreaterThan', true);

      must(actual).above(expected);

      return this;
    },

    isLessThan: function(expected) {

      countAssertion('isLessThan', true);

      must(actual).below(expected);

      return this;
    },

    isApprox: function(num, delta) {

      countAssertion('isApprox', true);

      should(actual).approximately(num, delta);

      return this;
    },

    isInfinite: function() {

      countAssertion('isInfinite', true);

      should(actual).Infinity;

      return this;
    },

    isNotInfinite: function() {

      countAssertion('isNotInfinite', true);

      should(actual).not.Infinity;

      return this;
    },


    ///////////////
    // Containers //
    ///////////////

    isEnumerable: function(property) {

      countAssertion('isEnumerable', true);

      must(actual).enumerable(property);

      return this;
    },

    isNotEnumerable: function(property) {

      countAssertion('isNotEnumerable', true);

      must(actual).nonenumerable(property);

      return this;
    },

    isFrozen: function() {

      countAssertion('isFrozen', true);

      must(actual).frozen();

      return this;
    },

    isNotFrozen: function() {

      countAssertion('isNotFrozen', true);

      must(actual).not.frozen();

      return this;
    },

    isInstanceOf: function(expected) {

      countAssertion('isInstanceOf', true);

      must(actual).instanceof(expected);

      return this;
    },

    isNotInstanceOf: function(expected) {

      countAssertion('isNotInstanceOf', true);

      must(actual).not.instanceof(expected);

      return this;
    },

    hasProperty: function(property, value) {

      countAssertion('hasProperty', true);

      if (!arguments.length) {

        throw new Error('hasProperty() asserter require the argument ' +
          '"property" (the name of the property).');

      } else if (arguments.length == 1) {

        must(actual).property(property);

      } else if (arguments.length == 2) {

        must(actual).property(property, value);

      } else {
        throw new Error('hasProperty() asserter, takes maximum 2 arguments ' +
          '(property and value).');
      }

      return this;
    },

    hasNotProperty: function(property, value) {

      countAssertion('hasNotProperty', true);

      if (arguments.length === 0) {

        throw new Error('hasNotProperty() asserter require the argument ' +
         '"property" (the name of the property).');

      } else if (arguments.length === 1) {

        must(actual).not.property(property);

      } else if (arguments.length === 2) {

        must(actual).not.property(property, value);

      } else {
        throw new Error('hasNotProperty() asserter, takes maximum ' +
          '2 arguments (property and value).');
      }

      return this;
    },

    hasOwnProperty: function(property, value) {

      countAssertion('hasOwnProperty ', true);

      if (arguments.length === 0) {

        throw new Error('hasOwnProperty() asserter require the argument ' +
          '"property" (the name of the property).');

      } else if (arguments.length === 1) {

        must(actual).ownProperty(property);

      } else if (arguments.length === 2) {

        must(actual).ownProperty(property, value);

      } else {
        throw new Error('hasOwnProperty() asserter, takes maximum ' +
          '2 arguments (property and value).');
      }

      return this;
    },

    hasNotOwnProperty: function(property, value) {

      countAssertion('hasNotOwnProperty', true);

      if (arguments.length === 0) {

        throw new Error('hasNotOwnProperty() asserter require the argument ' +
          '"property" (the name of the property).');

      } else if (arguments.length === 1) {

        must(actual).not.ownProperty(property);

      } else if (arguments.length === 2) {

        must(actual).not.ownProperty(property, value);

      } else {
        throw new Error('hasNotOwnProperty() asserter, takes maximum ' +
          '2 arguments (property and value).');
      }

      return this;
    },

    hasProperties: function(properties) {

      countAssertion('hasProperties', true);

      must(actual).keys(properties);

      return this;
    },

    hasNotProperties: function(properties) {

      countAssertion('hasNotProperties', true);

      must(actual).not.keys(properties);

      return this;
    },

    hasOwnProperties: function(properties) {

      countAssertion('hasOwnProperties', true);

      must(actual).ownKeys(properties);

      return this;
    },

    hasKey: function(key, value) {

      countAssertion('hasKey');

      return this.hasProperty.apply(this, arguments);
    },

    notHasKey: function(key, value) {

      countAssertion('notHasKey');

      return this.hasNotProperty.apply(this, arguments);
    },

    hasKeys: function(keys) {

      countAssertion('hasKeys');

      return this.hasProperties(keys);
    },

    notHasKeys: function(keys) {

      countAssertion('notHasKeys');

      return this.hasNotProperties(keys);
    },

    hasValue: function(expected) {

      countAssertion('hasValue', true);

      must(actual).include(expected);

      return this;
    },

    notHasValue: function(expected) {

      countAssertion('notHasValue', true);

      must(actual).not.include(expected);

      return this;
    },

    hasValues: function(expected) {

      countAssertion('hasValues', true);

      for (var k in expected) {
        must(actual).include(expected[k]);
      }

      return this;
    },

    notHasValues: function(expected) {

      countAssertion('notHasValues', true);

      for (var k in expected) {
        must(actual).not.include(expected[k]);
      }

      return this;
    },

    contains: function(expected) {
      countAssertion('contains', true);

      if (arguments.length > 1) {
        for (var k in arguments) {
          if(typeof arguments[k] === 'object') {
            should(actual).containDeep(arguments[k]);
          }else{
            must(actual).contain(arguments[k]);
          }
        }
      }
      else if(typeof actual === 'object') {
        should(actual).containDeep(expected);
      }
      else{
        must(actual).contain(expected);
      }

      return this;
    },

    notContains: function(expected) {
      countAssertion('notContains', true);

      if (arguments.length > 1) {
        for (var k in arguments) {
          if(typeof arguments[k] === 'object') {
            should(actual).not.containDeep(arguments[k]);
          }else{
            must(actual).not.contain(arguments[k]);
          }
        }
      }
      else if(typeof actual === 'object') {
        should(actual).not.containDeep(expected);
      }
      else{
        must(actual).not.contain(expected);
      }

      return this;
    },

    isReverseOf: function(expected) {

      countAssertion('isReverseOf');

      this.is(expected.reverse());
      must(actual).permutationOf(expected);

      return this;
    },

    isNotReverseOf: function(expected) {

      countAssertion('isNotReverseOf');

      this.isNot(expected.reverse());
      must(actual).not.permutationOf(expected);

      return this;
    },

    ////////////
    // String //
    ////////////

    startsWith: function(str) {

      countAssertion('startsWith', true);

      should(actual).startWith(str);

      return this;
    },

    notStartsWith: function(str) {

      countAssertion('notStartsWith', true);

      should(actual).not.startWith(str);

      return this;
    },

    endsWith: function(str) {

      countAssertion('endsWith', true);

      should(actual).endWith(str);

      return this;
    },

    notEndsWith: function(str) {

      countAssertion('notEndsWith', true);

      should(actual).not.endWith(str);

      return this;
    },

    ///////////////////
    // HTTP headers //
    ///////////////////

    hasHttpStatus: function(code) {

      countAssertion('hasHttpStatus', true);

      must(actual).property('statusCode', code);

      return this;
    },

    notHasHttpStatus: function(code) {

      countAssertion('notHasHttpStatus', true);

      must(actual).not.property('statusCode', code);

      return this;
    },

    hasHeader: function(field, value) {

      countAssertion('hasHeader', true);

      if (arguments.length === 0 || arguments.length > 2) {
        throw new Error('hasHeader() asserter, takes minimum the "field" ' +
          'argument, maximum 2 arguments (field and value).');
      }

      must(actual).property('headers');

      if (arguments.length === 1) {

        must(actual.headers).property(field.toLowerCase());
      } else {
        must(actual.headers).property(field.toLowerCase(), value);
      }

      return this;
    },

    notHasHeader: function(field, value) {

      countAssertion('notHasHeader', true);

      if (arguments.length === 0 || arguments.length > 2) {
        throw new Error('notHasHeader() asserter, takes minimum the "field" ' +
          'argument, maximum 2 arguments (field and value).');
      }

      if (arguments.length === 1) {

        must(actual.headers).not.property(field.toLowerCase());
      } else {
        must(actual.headers).not.property(field.toLowerCase(), value);
      }

      return this;
    },

    hasHeaderJson: function() {

      countAssertion('hasHeaderJson', true);

      must(actual).property('headers');
      must(actual.headers).property('content-type');
      must(actual.headers['content-type']).match(/application\/json/i);

      return this;
    },

    notHasHeaderJson: function() {

      countAssertion('notHasHeaderJson', true);

      if(actual && actual.headers && 'content-type' in actual.headers) {
        must(actual.headers['content-type']).not.match(/application\/json/i);
      }

      return this;
    },

    hasHeaderHtml: function() {

      countAssertion('hasHeaderHtml', true);

      must(actual).property('headers');
      must(actual.headers).property('content-type');
      must(actual.headers['content-type']).match(/text\/html/i);

      return this;
    },

    notHasHeaderHtml: function() {

      countAssertion('notHasHeaderHtml', true);

      if(actual && actual.headers && 'content-type' in actual.headers) {
        must(actual.headers['content-type']).not.match(/text\/html/i);
      }

      return this;
    }
  };
};