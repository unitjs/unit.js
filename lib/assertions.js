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
  assert = require('assert'),
	should = require('should'),
	must   = require('must')
;

// Expose all assertions
module.exports = function(actual) {

	// All assertions
	return {

		///////////
		// Match //
		///////////

		is: function(expected) {

			must(actual).eql(expected);

			return this;
		},

		isNot: function(expected) {

			must(actual).not.eql(expected);

			return this;
		},

		isIdenticalTo: function(expected) {

			assert.strictEqual(
        actual, 
        expected, 
        '(actual === expected), actual ' + typeof actual + ' is not identical '+
        'to expected ' + typeof expected
      );

			return this;
		},

		isNotIdenticalTo: function(expected) {

			assert.notStrictEqual(
        actual, 
        expected, 
        '(actual !== expected), actual ' + typeof actual + ' is identical to ' +
        'expected ' + typeof expected
      );

			return this;
		},

		isEqualTo: function(expected) {

			assert.equal(
        actual, 
        expected, 
        '(actual == expected), actual ' + typeof actual + ' is not equal to ' +
        'expected ' + typeof expected
      );

			return this;
		},

		isNotEqualTo: function(expected) {

			assert.notEqual(
        actual, 
        expected, 
        '(actual != expected), actual ' + typeof actual + ' is equal to ' + 
        'expected' + typeof expected
      );

			return this;
		},

		match: function(expected) {

			if(typeof expected == 'function'){

				if(expected(actual) !== true){
					throw new Error('actual value tested must match.');
				}

				return this;
			}

			must(actual).match(expected);

			return this;
		},

		notMatch: function(expected) {

			if(typeof expected == 'function'){

				if(expected(actual)){
					throw new Error(
            'actual value tested ('+ actual +') must not match ('+ expected +')'
          );
				}

				return this;
			}

			must(actual).not.match(expected);

			return this;
		},

		matchEach: function(expected) {

			var fails = function(actual, expected){
				throw new Error(
          'actual value tested ('+ actual +') must match ('+  expected +')'
        );
			};

			if(typeof expected == 'function'){

				if(typeof actual == 'object'){
					for(var k in actual){
						if(expected(actual[k], k) !== true){
							fails(actual[k],expected);
						}
					}
				}else{
					if(expected(actual) !== true){
						fails(actual,expected);
					}
				}

				return this;
			}

			for (var i in expected) {

				if(typeof expected[i] == 'function'){

					if(typeof actual == 'object'){
						for(var k in actual){
							if(expected[i](actual[k], k) !== true){
								fails(actual[k],expected[i]);
							}
						}

						continue;
					}

					if(expected[i](actual) !== true){
						fails(actual,expected[i]);
					}

					continue;
				}

				this.match(expected[i]);
			}

			return this;
		},

		notMatchEach: function(expected) {

			var fails = function(actual, expected){
				throw new Error('actual value tested ('+ actual +') must not match (' + 
          expected +')');
			};

			if(typeof expected == 'function'){

				if(typeof actual == 'object'){
					for(var k in actual){
						if(expected(actual[k], k)){
							fails(actual[k],expected);
						}
					}
				}else{
					if(expected(actual)){
						fails(actual,expected);
					}
				}

				return this;
			}

			for (var i in expected) {

				if(typeof expected[i] == 'function'){

					if(typeof actual == 'object'){

						for(var k in actual){
							if(expected[i](actual[k], k)){
								fails(actual[k],expected[i]);
							}
						}

						continue;
					}
					
					if(expected[i](actual)){
						fails(actual,expected[i]);
					}

					continue;
				}

				this.notMatch(expected[i]);
			}

			return this;
		},

		isValid: function(expected) {

			return this.match(expected);
		},

		isNotValid: function(expected) {

			return this.notMatch(expected);
		},


		///////////
		// Types //
		///////////

		isType: function(expected) {

			should(actual).type(expected);

			return this;
		},

		isNotType: function(expected) {

			should(actual).not.type(expected);

			return this;
		},

		isObject: function() {

			must(actual).object();

			return this;
		},

		isArray: function() {

			must(actual).array();

			return this;
		},

		isFunction: function() {

			must(actual).function();

			return this;
		},

		isString: function() {

			must(actual).string();

			return this;
		},

		isNumber: function() {

			must(actual).number();

			return this;
		},

		isBool: function() {

			return this.isBoolean();
		},

		isBoolean: function() {

			must(actual).boolean();

			return this;
		},

		isNull: function() {

			must(actual).null();

			return this;
		},

		isUndefined: function() {

			must(actual).undefined();

			return this;
		},

		/////////////////////
		// Types augmented //
		/////////////////////


		isRegExp: function() {

			must(actual).regexp();

			return this;
		},

		isNotRegExp: function() {

			must(actual).not.regexp();

			return this;
		},

		isDate: function() {

			must(actual).date();

			return this;
		},

		isNotDate: function() {

			must(actual).not.date();

			return this;
		},

		isArguments: function() {

			should(actual).arguments;

			return this;
		},

		isNotArguments: function() {

			should(actual).not.arguments;

			return this;
		},

		isTrue: function() {

			must(actual).true();

			return this;
		},

		isNotTrue: function() {

			must(actual).not.true();

			return this;
		},

		isTruthy: function() {

			must(actual).truthy();

			return this;
		},

		isNotTruthy: function() {

			must(actual).not.truthy();

			return this;
		},

		isFalse: function() {

			must(actual).false();

			return this;
		},

		isNotFalse: function() {

			must(actual).not.false();

			return this;
		},

		isFalsy: function() {

			must(actual).falsy();

			return this;
		},

		isNotFalsy: function() {

			must(actual).not.falsy();

			return this;
		},

		isEmpty: function() {

			must(actual).empty();

			return this;
		},

		isNotEmpty: function() {

			must(actual).not.empty();

			return this;
		},

		exists: function() {

			must(actual).exist();

			return this;
		},

		isError: function() {

			return this.throws(Error);
		},

		throws: function(constructor, expected) {

			if (arguments.length > 2) {
				throw new Error(
          'throws() asserter, takes maximum 2 arguments ' + 
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

			if(typeof actual == 'object'){
				
				var count = 0;

				for(var k in actual){
					count++;
				}

				if(count !== expected){
					throw new Error(actual+ 'must has length of '+expected);
				}

			}else{
				must(actual).length(expected);
			}

			return this;
		},

		hasNotLength: function(expected) {

			if(typeof actual == 'object'){
				
				var count = 0;

				for(var k in actual){
					count++;
				}

				if(count === expected){
					throw new Error(actual+ 'must has not length of '+expected);
				}

			}else{
				must(actual).not.length(expected);
			}

			return this;
		},

		isBetween: function(begin, end) {

			must(actual).between(begin, end);

			return this;
		},

		isNotBetween: function(begin, end) {

			must(actual).not.between(begin, end);

			return this;
		},

		isBefore: function(expected) {

			must(actual).before(expected);

			return this;
		},

		isAfter: function(expected) {

			must(actual).after(expected);

			return this;
		},

		isGreaterThan: function(expected) {

			must(actual).above(expected);

			return this;
		},

		isLessThan: function(expected) {

			must(actual).below(expected);

			return this;
		},

		isApprox: function(num, delta) {

			should(actual).approximately(num, delta);

			return this;
		},

		isInfinite: function() {

			should(actual).Infinity;

			return this;
		},

		isNotInfinite: function() {

			should(actual).not.Infinity;

			return this;
		},


		///////////////
		// Containers //
		///////////////

		isEnumerable: function(property) {

			must(actual).enumerable(property);

			return this;
		},

		isNotEnumerable: function(property) {

			must(actual).nonenumerable(property);

			return this;
		},

		isFrozen: function() {

			must(actual).frozen();

			return this;
		},

		isNotFrozen: function() {

			must(actual).not.frozen();

			return this;
		},

		isInstanceOf: function(expected) {

			must(actual).instanceof(expected);

			return this;
		},

		isNotInstanceOf: function(expected) {

			must(actual).not.instanceof(expected);

			return this;
		},

		hasProperty: function(property, value) {

			if (arguments.length == 0) {

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

			if (arguments.length == 0) {

				throw new Error('hasNotProperty() asserter require the argument ' + 
         '"property" (the name of the property).');

			} else if (arguments.length == 1) {

				must(actual).not.property(property);

			} else if (arguments.length == 2) {

				must(actual).not.property(property, value);

			} else {
				throw new Error('hasNotProperty() asserter, takes maximum ' + 
          '2 arguments (property and value).');
			}

			return this;
		},

		hasOwnProperty: function(property, value) {

			if (arguments.length == 0) {

				throw new Error('hasOwnProperty() asserter require the argument ' + 
          '"property" (the name of the property).');

			} else if (arguments.length == 1) {

				must(actual).ownProperty(property);

			} else if (arguments.length == 2) {

				must(actual).ownProperty(property, value);

			} else {
				throw new Error('hasOwnProperty() asserter, takes maximum ' + 
          '2 arguments (property and value).');
			}

			return this;
		},

		hasNotOwnProperty: function(property, value) {

			if (arguments.length == 0) {

				throw new Error('hasNotOwnProperty() asserter require the argument ' +
        '"property" (the name of the property).');

			} else if (arguments.length == 1) {

				must(actual).not.ownProperty(property);

			} else if (arguments.length == 2) {

				must(actual).not.ownProperty(property, value);

			} else {
				throw new Error('hasNotOwnProperty() asserter, takes maximum ' + 
          '2 arguments (property and value).');
			}

			return this;
		},

		hasProperties: function(properties) {

			must(actual).keys(properties);

			return this;
		},

		hasNotProperties: function(properties) {

			must(actual).not.keys(properties);

			return this;
		},

		hasOwnProperties: function(properties) {

			must(actual).ownKeys(properties);

			return this;
		},

		hasKey: function(key, value) {
			return this.hasProperty.apply(this, arguments);
		},

		notHasKey: function(key, value) {
			return this.hasNotProperty.apply(this, arguments);
		},

		hasKeys: function(keys) {
			return this.hasProperties(keys);
		},
		
		notHasKeys: function(keys) {
			return this.hasNotProperties(keys);
		},

		hasValue: function(expected) {

			must(actual).include(expected);

			return this;
		},

		notHasValue: function(expected) {

			must(actual).not.include(expected);

			return this;
		},

		hasValues: function(expected) {

			for (var k in expected) {
				must(actual).include(expected[k]);
			}

			return this;
		},

		notHasValues: function(expected) {

			for (var k in expected) {
				must(actual).not.include(expected[k]);
			}

			return this;
		},

		contains: function(expected) {

			if (arguments.length > 1) {

				for (var k in arguments) {
					should(actual).containDeep(arguments[k]);
				}

			} else {
				should(actual).containDeep(expected);
			}

			return this;
		},

		notContains: function(expected) {

			if (arguments.length > 1) {

				for (var k in arguments) {
					should(actual).not.containDeep(arguments[k]);
				}

			} else {
				should(actual).not.containDeep(expected);
			}

			return this;
		},

		////////////
		// String //
		////////////

		startsWith: function(str) {

			should(actual).startWith(str);

			return this;
		},

		notStartsWith: function(str) {

			should(actual).not.startWith(str);

			return this;
		},

		endsWith: function(str) {

			should(actual).endWith(str);

			return this;
		},

		notEndsWith: function(str) {

			should(actual).not.endWith(str);

			return this;
		},

		///////////////////
		// HTTP headers //
		///////////////////

		hasHttpStatus: function(code) {

			should(actual).have.status(code);

			return this;
		},

		notHasHttpStatus: function(code) {

			should(actual).not.status(code);

			return this;
		},

		hasHeader: function(field, value) {

			if (arguments.length == 0 || arguments.length > 2) {
				throw new Error('hasHeader() asserter, takes minimum the "field" ' + 
          'argument, maximum 2 arguments (field and value).');
			}

			if (arguments.length === 1) {

				must(actual['headers']).property(field);
			} else {
				should(actual).have.header(field, value);
			}

			return this;
		},

		notHasHeader: function(field, value) {

			var isThrows = true;

			if (arguments.length == 0 || arguments.length > 2) {
				throw new Error('notHasHeader() asserter, takes minimum the "field" ' + 
          'argument, maximum 2 arguments (field and value).');
			}

			if (arguments.length === 1) {

				must(actual['headers']).not.property(field);
			} else {
				should(actual).not.header(field, value);
			}

			return this;
		},

		hasHeaderJson: function() {

			should(actual).be.json;

			return this;
		},

		notHasHeaderJson: function() {

			should(actual).not.json;

			return this;
		},

		hasHeaderHtml: function() {

			should(actual).be.html;

			return this;
		},

		notHasHeaderHtml: function() {

			should(actual).not.html;

			return this;
		}
	}
};