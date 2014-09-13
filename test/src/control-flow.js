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

describe('Control flow', function() {

  describe('Performs the tests without entangled with the flow of ' +
    'other series of tests', function() {

    it('Series launched with chaining', function() {
      test
        .exception(function() {
          test
            .string('serie1-1')
              .isEqualTo('serie1-1')

            .string('serie1-2')
              .isEqualTo('serie1-2')

            .string('serie1-3')
              .isEqualTo('serie1-3')
          ;

          throw new Error('Whoops1-1 !');

        })
          .hasMessage('Whoops1-1 !')
          .hasMessage(/Whoop/)

        .string('serie2-1')
          .isEqualTo('serie2-1')

        .exception(function() {
          test
            .string('serie2-1')
              .isEqualTo('serie2-1')

            .string('serie2-2')
              .isEqualTo('serie2-2')

            .string('serie2-3')
              .isEqualTo('serie2-3')
          ;

          throw new Error('Whoops2-1 !');
        })
          .hasMessage('Whoops2-1 !')
          .hasMessage(/Whoop/)

        .string('serie3-1')
          .isEqualTo('serie3-1')

        .exception(function() {
          throw new Error('Whoops3-1 !');
        })
          .hasMessage('Whoops3-1 !')

        .string('serie4-1')
          .isEqualTo('serie4-1')

        .exception(function() {
          throw new Error('Whoops4-1 !');
        })
          .hasMessage('Whoops4-1 !')

        .string('serie5-1')
          .isEqualTo('serie5-1')

        .string('serie5-2')
          .isEqualTo('serie5-2')

        .string('serie5-3')
          .isEqualTo('serie5-3')

        .then()
          .string('serie5-4')
          .isEqualTo('serie5-4')
      ;
    });

    it('Series launched without chaining', function() {
      test
        .exception(function() {
          test.string('serie1-1').isEqualTo('serie1-1');
          test.string('serie1-2').isEqualTo('serie1-2');
          test.string('serie1-3').isEqualTo('serie1-3');

          throw new Error('Whoops1-1 !');
        })
          .hasMessage('Whoops1-1 !')
          .hasMessage(/Whoop/)
      ;

      test.string('serie2-1').isEqualTo('serie2-1');

      test
        .exception(function() {
          test.string('serie2-1').isEqualTo('serie2-1');
          test.string('serie2-2').isEqualTo('serie2-2');
          test.string('serie2-3').isEqualTo('serie2-3');

          throw new Error('Whoops2-1 !');
        })
          .hasMessage('Whoops2-1 !')
          .hasMessage(/Whoop/);

      test.string('serie3-1').isEqualTo('serie3-1');

      test.exception(function() {
        throw new Error('Whoops3-1 !');
      })
        .hasMessage('Whoops3-1 !');

      test.string('serie4-1').isEqualTo('serie4-1');

      test.exception(function() {
        throw new Error('Whoops4-1 !');
      })
        .hasMessage('Whoops4-1 !');

      test.string('serie5-1').isEqualTo('serie5-1');
      test.string('serie5-2').isEqualTo('serie5-2');
      test.string('serie5-3').isEqualTo('serie5-3');
      test.string('serie5-4').isEqualTo('serie5-4');
    });

    it('Chaining with dependency injection', function() {

      test
        .$provider('getStrProvider', function(self) {

          test.object(self)
            .isIdenticalTo(test.$di._container);

          // test reference
          self.fromSelf = 'ok from self';

          return function(val) {

            test.string(val);

            return val;
          };
        })
        .case('Test the chain of provider', function() {

          var fn = test.$di.get('getStrProvider');

          test
            .function(fn)

            .string(fn('ok1'))
              .isIdenticalTo('ok1')

            .string(test.$di.get('fromSelf'))
              .isIdenticalTo('ok from self')
          ;
        })

          .$invoke('getStrProvider', function(getStr) {

            test.string(getStr('ok2'))
              .isIdenticalTo('ok2');

            return test;
          })

        .case('Test the chain of a factorized function')
          .$factory('chainStrTest', 'getStrProvider', function(getStr) {

            return test
              .function(getStr)
              .string(getStr('from factory'))
            ;
          })
          .$di.get('chainStrTest')
            .isIdenticalTo('from factory')
      ;
    });

    it('Series with helpers', function() {

      var str;
      var indicator;
      var log = console.log;

      console.log = test.spy();

      test
        .given(str = 'serie1-1')

        .string(str)
          .isEqualTo('serie1-1')

        .when('change "str" value', function() {
          str = 'serie1-2';
        })

        .then(function() {
          indicator = true;

          test.string(str).isEqualTo('serie1-2');
        })

        .case('Checks that "then" execute the function argument')

        .bool(indicator)
          .isTrue()

        .string('1').dump('test.dump()').is('1')

        .bool(console.log.called)
          .isTrue()

        .then(function() {
          console.log = log;
        })

        .then('Check break of flow')

        .exception(function() {
          test.string('1').case().is('1');
        })

        .exception(function() {
          test.string('1').if().is('1');
        })

        .exception(function() {
          test.string('1').and().is('1');
        })

        .exception(function() {
          test.string('1').case.is('1');
        })
        .exception(function() {
          test.string('1').if.is('1');
        })

        .exception(function() {
          test.string('1').and.is('1');
        })

        .exception(function() {
          test.string('1').given().is('1');
        })

        .exception(function() {
          test.string('1').when().is('1');
        })

        .exception(function() {
          test.string('1').then().is('1');
        })

        .then('The context of flow', function() {

          var flow = test.string('1').bool(true).isTrue();

          test
            .object(flow)
              .hasProperty('isTrue')
              .hasProperty('isFalse')
              .hasNotProperty('hasValue')

            .object(test.string('1'))
              .hasProperty('hasValue')
          ;
        })
      ;
    });
  });
});