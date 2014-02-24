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
  asserters = require('./asserters'),
	helpers 	= require('./helpers')
;

module.exports = function CommonApi() {

	for (var method in helpers) {
		this[method] = helpers[method];
	}

	for (var method in asserters) {
		this[method] = asserters[method];
	}

	return this;
};