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

var asserters = require('./asserters');
var helpers   = require('./helpers');


module.exports = function ControlFlow() {

  for (var method in helpers) {
    this[method] = helpers[method];
  }

  for (var method in asserters) {
    this[method] = asserters[method];
  }

  return this;
};