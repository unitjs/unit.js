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

// asserters are added below
module.exports.array = function(actual) {   var Asserter = require('./asserters/array');   return new Asserter(actual); };
module.exports.bool = function(actual) {   var Asserter = require('./asserters/bool');   return new Asserter(actual); };
module.exports.date = function(actual) {   var Asserter = require('./asserters/date');   return new Asserter(actual); };
module.exports.error = function(actual) {   var Asserter = require('./asserters/error');   return new Asserter(actual); };
module.exports.exception = function(actual) {   var Asserter = require('./asserters/exception');   return new Asserter(actual); };
module.exports.function = function(actual) {   var Asserter = require('./asserters/function');   return new Asserter(actual); };
module.exports.number = function(actual) {   var Asserter = require('./asserters/number');   return new Asserter(actual); };
module.exports.object = function(actual) {   var Asserter = require('./asserters/object');   return new Asserter(actual); };
module.exports.regexp = function(actual) {   var Asserter = require('./asserters/regexp');   return new Asserter(actual); };
module.exports.string = function(actual) {   var Asserter = require('./asserters/string');   return new Asserter(actual); };
module.exports.undefined = function(actual) {   var Asserter = require('./asserters/undefined');   return new Asserter(actual); };
module.exports.value = function(actual) {   var Asserter = require('./asserters/value');   return new Asserter(actual); };