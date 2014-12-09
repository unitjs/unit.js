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

// load asserters
require('./asserters');

var api            = require('./api');
var RawControlFlow = require('./control-flow');
var promise        = require('./promise');
var util           = require('./util');
var assert         = require('./assert');
var should         = require('should');
var must           = require('must');
var sinon          = require('sinon');
var supertest      = require('supertest');

// Populate the root API
api.promise        = promise;
api.promisify      = promise.promisify;
api.promisifyAll   = promise.promisifyAll;
api.assert         = assert;
api.sinon          = sinon;
api.spy            = sinon.spy;
api.stub           = sinon.stub;
api.mock           = sinon.mock;
api.useFakeTimers  = sinon.useFakeTimers;
api.httpAgent      = supertest;

// Build the main API with the context API
var ControlFlow    = RawControlFlow.bind(api);
var commonApi      = new ControlFlow();

api = util.merge(api, commonApi);

// Should.js assert on property access.
// This hack, avoids the side-effects on object "api"
// that should.js could cause
Object.defineProperty(api, 'should', {
  value: should
});

// avoid the side-effects
Object.defineProperty(api, 'must', {
  value: must
});

// expose
module.exports = api;