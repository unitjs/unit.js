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

var test  = require('../../src');


describe('Passes IOC container', function() {

  beforeEach(function() {

    test.$di
      .set('spy', test.spy())

      .provider('assertSpy', 'spy', function(spy) {

        return function(num) {

          test.assert(spy.callCount === num);

          return test;
        };
      })

      .set('callSpy', function() {

        test.$di.get('spy');

        return test;
      })
    ;


  });

  afterEach(function() {

    test.$di
      .remove('spy')
      .remove('assertSpy')
      .remove('callSpy')
    ;
  });

  it('case()', function() {

    test
      .case(function() {

        test.object(this)
          .isIdenticalTo(test.$di._container);

        this.callSpy();
      })
      .$di.get('assertSpy')(1)

      .then('control flow')
        .object({})
        .case(function() {

          test.object(this)
            .isIdenticalTo(test.$di._container);

          this.callSpy();
        })
        .$di.get('assertSpy')(2)
    ;
  });

  it('given()', function() {

    test
      .given(function() {

        test.object(this)
          .isIdenticalTo(test.$di._container);

        this.callSpy();
      })
      .$di.get('assertSpy')(1)

      .then('control flow')
        .object({})
        .given(function() {

          test.object(this)
            .isIdenticalTo(test.$di._container);

          this.callSpy();
        })
        .$di.get('assertSpy')(2)
    ;
  });

  it('when()', function() {

    test
      .when(function() {

        test.object(this)
          .isIdenticalTo(test.$di._container);

        this.callSpy();
      })
      .$di.get('assertSpy')(1)

      .then('control flow')
        .object({})
        .when(function() {

          test.object(this)
            .isIdenticalTo(test.$di._container);

          this.callSpy();
        })
        .$di.get('assertSpy')(2)
    ;
  });

  it('then()', function() {

    test
      .then(function() {

        test.object(this)
          .isIdenticalTo(test.$di._container);

        this.callSpy();
      })
      .$di.get('assertSpy')(1)

      .then('control flow')
        .object({})
        .then(function() {

          test.object(this)
            .isIdenticalTo(test.$di._container);

          this.callSpy();
        })
        .$di.get('assertSpy')(2)
    ;
  });

  it('if()', function() {

    test
      .if(function() {

        test.object(this)
          .isIdenticalTo(test.$di._container);

        this.callSpy();
      })
      .$di.get('assertSpy')(1)

      .then('control flow')
        .object({})
        .if(function() {

          test.object(this)
            .isIdenticalTo(test.$di._container);

          this.callSpy();
        })
        .$di.get('assertSpy')(2)
    ;
  });

  it('and()', function() {

    test
      .and(function() {

        test.object(this)
          .isIdenticalTo(test.$di._container);

        this.callSpy();
      })
      .$di.get('assertSpy')(1)

      .then('control flow')
        .object({})
        .and(function() {

          test.object(this)
            .isIdenticalTo(test.$di._container);

          this.callSpy();
        })
        .$di.get('assertSpy')(2)
    ;
  });

  it('wait()', function(done){

    var spy = test.spy(function() {
      calledAt  = new Date();
      calledAt  = calledAt.getTime();
    });
    var defAt = new Date();
    var calledAt;

    test.wait(20, spy);

    setTimeout(function(){

      test.assert(spy.calledOnce);
      defAt = defAt.getTime();

      test.number(calledAt)
        .isGreaterThan(defAt + 18);

      done();
    }, 25);
  });

  it('dump()', function() {

    var log = console.log;

    console.log = test.spy();

    test
      .string('1')
        .dump('test.dump()')
        .is('1')

      .bool(console.log.called)
        .isTrue()
    ;

    console.log = log;
  });

  it('stats', function() {
    var countAssert, countAssertOk, total;

    test
      .object(test.stats)
      .object(test.stats.assertions)
      .object(test.stats.total)

      .number(test.stats.total.assertions)
        .isGreaterThan(2)

      .number(test.stats.assertions.isObject)
        .isGreaterThan(1)

      .number(test.stats.assertions.isNumber)
        .isGreaterThan(1)

      .case('assert', function() {
        total         = test.stats.total.assertions;
        countAssert   = test.stats.assertions.assert || 0;
        countAssertOk = test.stats.assertions['assert.ok'] || 0;

        test.assert(true);
        test.assert.ok(true);

        test
          .number(test.stats.total.assertions)
            .is(total + 2)

          .number(test.stats.assertions.assert)
            .is(countAssert + 1)

          .number(test.stats.assertions['assert.ok'])
            .is(countAssertOk + 1)
        ;
      })
    ;
  });
});