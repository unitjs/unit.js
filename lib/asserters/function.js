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
	RawCommonApi 			= require('../common_api'), 				// constructor
	rawAssertions 		= require('../assertions'), 				// object
	commonAssertions 	= require('../common_assertions'), 	// array
	_ 								= require('noder.io')._,
	util 							= require('../util'),
	_actual
;

// list the assertions to the current asserter (specific and common)
var useAssertions = commonAssertions.concat(['throws', 'isError']);

function getName(){

	var name = '';

    if (typeof _actual === 'function') {
        name = _actual.name 
        	|| _actual.toString().match(/^function\s?([^\s(]*)/)[1];

    } else if (typeof _actual.constructor === 'function') {
        name = this.hasName(_actual.constructor);
    }
    return name;
}

var asserter = { 

	hasName: function(expected){
		this.value(getName()).isIdenticalTo(expected);

		return this;
	}
};

/**
 * Expose all assertions
 * @type {function}
 * @param  {mixed} actual Actual value tested
 * @return {Object}        The current asserter
 */
module.exports = function FunctionAsserter(actual) {

	// actual value tested
	this.actual = _actual = actual;

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
	assertions.isFunction(this.actual);

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