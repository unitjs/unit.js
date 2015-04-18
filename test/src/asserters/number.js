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

var test = require('../../../src');

describe('Asserter number()', function(){

  describe('number() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      test
        .value(test.number(1).hasHeader)
          .isUndefined()

        .value(test.number(1).hasProperty)
          .isUndefined()

        .value(test.number(1).hasMessage)
          .isUndefined()
      ;

    });

    it('Assert that the tested value is a `number`', function(){

      test
        .number(2)
        .number(99.98)
        .number(NaN)

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number('0');
            })

            .exception(function(){
              test.number('1');
            })

            .exception(function(){
              test.number(/0/);
            })

            .exception(function(){
              test.number(/1/);
            })

            .exception(function(){
              test.number(true);
            })

            .exception(function(){
              test.number(false);
            })

            .exception(function(){
              test.number(null);
            })

            .exception(function(){
              test.number(undefined);
            })

            .exception(function(){
              test.number({});
            })

            .exception(function(){
              test.number([]);
            })
          ;
        })
      ;
    });
  });

  describe('Assertions of number()', function(){

    it('is(expected)', function(){

      test
        .number(2)
          .is(2)

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2).is(-2)
            })

            .exception(function(){
              test.number(2).is(2.02)
            })
          ;

        })
      ;

    });

    it('isNot(expected)', function(){

      test
        .number(2)
          .isNot(3)
          .isNot('2')
          .isNot(2.1)
          .isNot(0.2)
          .isNot(0.02)
          .isNot(-2)

        .exception(function(){
          test.number(2).isNot(2);
        })
      ;

    });

    it('isIdenticalTo(expected)', function(){

      test
        .number(1)
          .isIdenticalTo(1)

         .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2).isIdenticalTo(-2)
            })

            .exception(function(){
              test.number(2).isIdenticalTo(2.02)
            })
          ;

        })
      ;

    });

    it('isNotIdenticalTo(expected)', function(){

      test
        .number(2)
          .isNotIdenticalTo(3)
          .isNotIdenticalTo('2')
          .isNotIdenticalTo(2.1)
          .isNotIdenticalTo(0.2)
          .isNotIdenticalTo(-2)

        .exception(function(){
          test.number(2).isNotIdenticalTo(2);
        })
      ;

    });

    it('isEqualTo(expected)', function(){

      test
        .number(1)
          .isEqualTo(1)
          .isEqualTo('1')

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2).isEqualTo(-2)
            })

            .exception(function(){
              test.number(2).isEqualTo(2.02)
            })
          ;

        })
     ;

    });

    it('isNotEqualTo(expected)', function(){

      test
        .number(2)
          .isNotEqualTo(3)
          .isNotEqualTo(-2)
          .isNotEqualTo(2.1)
          .isNotEqualTo('2.1')

        .exception(function(){
          test.number(2).isNotEqualTo(2);
        })
      ;

    });

    it('match(expected)', function(){

      test

        // Assert with a RegExp
        .number(2014).match(/20+[1-4]/)

        // Assert with a number converted to RegExp
        .number(2014).match(201)

        // Assert with a function
        .number(2014).match(function(it){
          return it === 2014;
        })

        .exception(function(){
          test.number(2).match(/3/);
        })
      ;

    });

    it('notMatch(expected)', function(){

      test

        // Assert with a RegExp
        .number(2014)
          .notMatch(/20+[5-6]/)
          .notMatch(/[a-z]/)

        // Assert with a number converted to RegExp
        .number(10)
          .notMatch(8)

        // Assert with a function
        .number(10)
          .notMatch(function(it){
            return it === 42;
          })

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2).notMatch(/2/);
            })

            .exception(function(){
              test.number(2014).notMatch(function(it){
                return it === 2014;
              });
            })
          ;

        })
      ;

    });

    it('isValid(expected)', function(){

      test

        // Assert with a RegExp
        .number(2014).isValid(/20+[1-4]/)

        // Assert with a number converted to RegExp
        .number(2014).isValid(201)

        // Assert with a function
        .number(2014).isValid(function(it){
          return it === 2014;
        })

        .exception(function(){
          test.number(2).isValid(/3/);
        })
      ;

    });

    it('isNotValid(expected)', function(){

      test

        // Assert with a RegExp
        .number(2014)
          .isNotValid(/20+[5-6]/)
          .isNotValid(/[a-z]/)

        // Assert with a number converted to RegExp
        .number(10)
          .isNotValid(8)

        // Assert with a function
        .number(10)
          .isNotValid(function(it){
            return it === 42;
          })

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2).isNotValid(/2/);
            })

            .exception(function(){
              test.number(2014).isNotValid(function(it){
                return it === 2014;
              });
            })
          ;

        })
      ;

    });

    it('matchEach(expected)', function(){

      test
        .number(2014)
          .matchEach([2, 4, 1, 0])
          .matchEach([2014, function(it){
            return it === 2014;
          }])

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2014).matchEach([2014, function(it){
                return it === 2041;
              }]);
            })

            .exception(function(){
              test.number(2).matchEach([2, 3]);
            })

            .exception(function(){
              test.number(2014).matchEach([2041, function(it){
                return it === 2014;
              }]);
            })
          ;
        })
      ;

    });

    it('notMatchEach(expected)', function(){

      test
        .number(2014)
          .notMatchEach([3, 200])
          .notMatchEach([2012, function(it){
            return it !== 2014;
          }])

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2).notMatchEach([2, 3]);
            })

            .exception(function(){
              test.number(2014).notMatchEach([2041, function(it){
                return it === 2014;
              }]);
            })

            .exception(function(){
              test.number(2014).notMatchEach([2012, function(it){
                return it === 2014;
              }]);
            })
          ;
        })
      ;

    });

    it('isBetween(begin, end)', function(){

      test
        .number(2)
          .isBetween(2, 4)

        .number(3)
          .isBetween(2, 4)

        .number(4)
          .isBetween(2, 4)

        .number(4)
          .isBetween(3.99, 4.01)

        .number(1)
          .isBetween(-1.00000001, 1.0000000001)

        .case('Test failure', function(){

          test
            .exception(function(){
              test.number(2).isBetween(-3, -1);
            })

            .exception(function(){
              test.number(2).isBetween(3, 1);
            })
          ;
        })
      ;

    });

    it('isNotBetween(begin, end)', function(){

      test
        .number(1)
          .isNotBetween(2, 4)

        .number(5)
          .isNotBetween(2, 4)

        .exception(function(){
          test.number(2).isNotBetween(1, 3);
        })
      ;

    });

    it('isBefore(expected)', function(){

      test
        .number(1)
          .isBefore(2)
          .isBefore(1.01)

        .exception(function(){
          test.number(1).isBefore(0);
        })
      ;

    });

    it('isAfter(expected)', function(){

      test
        .number(2)
          .isAfter(1)
          .isAfter(1.99)
          .isAfter(-3)

        .exception(function(){
          test.number(-1).isAfter(0);
        })
      ;

    });

    it('isLessThan(expected)', function(){

      test
        .number(1)
          .isLessThan(2)
          .isLessThan(1.01)

        .exception(function(){
          test.number(1).isLessThan(0);
        })
      ;

    });

    it('isGreaterThan(expected)', function(){

      test
        .number(2)
          .isGreaterThan(1)
          .isGreaterThan(1.99)
          .isGreaterThan(-3)

        .exception(function(){
          test.number(-1).isGreaterThan(0);
        })
      ;

    });

    it('isApprox(num, delta)', function(){

      test
        .number(99.98)
          .isApprox(100, 0.02)

        .exception(function(){
          test.number(99.98).isApprox(100, 0.01);
        })
      ;

    });

    it('isInfinite()', function(){

      test
        .number(1/0)
          .isInfinite()

        .exception(function(){
          test.number(1.333333333333333333333).isInfinite();
        })
      ;

    });

    it('isNotInfinite()', function(){

      test
        .number(1.333333333333333333333333)
          .isNotInfinite()

        .exception(function(){
          test.number(1/0).isNotInfinite();
        })
      ;

    });

    it('isNaN()', function(){
      test
        .number(NaN)
          .isNaN()

        .number(new Number(NaN))
          .isNaN()

        .number(0/0)
          .isNaN()

        .number(parseInt('a', 10))
          .isNaN()

        .exception(function(){
          test.number(1).isNaN();
        })

        .exception(function(){
          test.number(new Number(1)).isNaN();
        })

        .exception(function(){
          test.number(0).isNaN();
        })
      ;
    });

    it('isNotNaN()', function(){
      test
        .number(1)
          .isNotNaN()

        .number(new Number(1))
          .isNotNaN()

        .number(0)
          .isNotNaN()

        .exception(function(){
          test.number(NaN).isNotNaN();
        })

        .exception(function(){
          test.number(new Number(NaN)).isNotNaN();
        })

        .exception(function(){
          test.number(0/0).isNotNaN();
        })

        .exception(function(){
          test.number(parseInt('a', 10)).isNotNaN();
        })
      ;
    });

  });
});