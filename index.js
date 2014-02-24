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
  asserters    = require('./lib/asserters'),
  RawCommonApi = require('./lib/common_api'),
  assert       = require('assert'),
  should       = require('should'),
  must         = require('must'),
  sinon        = require('sinon'),
  util         = require('./lib/util'),
  main         = {
    assert:         assert,
    should:         should,
    must:           must,
    sinon:          sinon,
    spy:            sinon.spy,
    stub:           sinon.stub,
    mock:           sinon.mock,
    useFakeTimers:  sinon.useFakeTimers
  }
;

// Build the root API with the main context
var CommonApi = RawCommonApi.bind(main);
var commonApi = new CommonApi();

main = util.merge(main, commonApi);

// expose
exports = module.exports = main;