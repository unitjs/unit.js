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

var promise = require('bluebird');

/**
 * Create a promise that is resolved with the given value.
 * If value is already a trusted Promise, it is returned as is.
 * If value is not a thenable, a fulfilled Promise is returned
 * with value as its fulfillment value. If value is a thenable
 * (Promise-like object, like those returned by jQuery's $.ajax),
 * returns a trusted Promise that assimilates the state of the thenable.
 *
 * Important: Unlike `promise.resolve()`, if the value is a function,
 * `promise.given()` is the equivalent of `promise.resolve().then(value)`.
 *
 * @param  {mixed} value  Dynamic value.
 *                        See https://github.com/petkaantonov/bluebird/blob/master/API.md#promiseresolvedynamic-value---promise
 *
 * @return {object}  A trusted Promise that assimilates the state of the thenable.
 */
promise.given = function(value) {

  // empty
  if(typeof value === 'undefined') {
    return promise.resolve();
  }

  // function
  if(typeof value === 'function') {
    return promise.resolve().then(value);
  }

  // object (not a promise)
  if(typeof value === 'object' && !promise.is(value)) {
    return promise.props(value);
  }

  // other
  return promise.resolve(value);
};

/**
 * Alias of `promise.then`
 * @type {function}
 */
promise.prototype.when = promise.prototype.then;

module.exports = promise;