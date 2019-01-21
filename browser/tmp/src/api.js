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

var Noder = require('noder.io').Noder;

/**
 * @constructor
 */
function UnitJS() {
  Noder.call(this);
}

UnitJS.prototype = Object.create(Noder.prototype, {
  constructor: { value: UnitJS }
});

UnitJS.prototype.UnitJS = UnitJS;

module.exports = new UnitJS();