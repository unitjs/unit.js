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

var test = require('../../src');

describe('Faking time', function() {

  var clock;

  before(function() {
    clock = test.useFakeTimers();
  });

  after(function() {
    clock.restore();
  });

  it('calls callback after 100ms', function() {

    var spy = test.spy();

    setTimeout(spy, 100);

    clock.tick(99);
    test.assert(spy.notCalled);

    clock.tick(1);
    test.assert(spy.calledOnce);

    // Also:
    test.assert.strictEqual(new Date().getTime(), 100);
  });
});