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

var Noder  = require('noder.io').Noder;
var test   = require('../../src');
var api    = require('../../src/api');

describe('Unit.js', function() {

  it('inherits from `Noder`', function() {

    test
      .object(test)
        .isInstanceOf(Noder)
        .isInstanceOf(api.UnitJS)
        .isIdenticalTo(api)

      .function(test.constructor)
        .hasName('UnitJS')
    ;
  });
});