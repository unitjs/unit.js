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

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     utils.merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Chain
 *
 * Note:
 * 	`fn.name = fn.name;` thrown in browser:
 *  `Cannot assign to read only property 'name'`
 *
 * @param  {function} fn
 * @return {function}
 */
exports.chain = function(fn) {

  fn.apply     = fn.apply;
  fn.bind      = fn.bind;
  fn.call      = fn.call;
  fn.toString  = fn.toString;
  fn.__proto__ = this;

  return fn;
};