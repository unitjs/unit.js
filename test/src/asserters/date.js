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

describe('Asserter date()', function(){

  describe('date() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      test
        .value(test.date(new Date()).hasHeader)
          .isUndefined()

        .value(test.date(new Date()).hasProperty)
          .isUndefined()

        .value(test.date(new Date()).hasMessage)
          .isUndefined()

        .value(test.date(new Date()).isInfinite)
          .isUndefined()
      ;
    });

    it('Assert that the tested value is an instance of `Date`', function(){

      test
        .date(new Date())
        .date(new Date('2010, 5, 20'))

        .case('Test failure', function(){

          test
            .exception(function(){
              test.date('2010 5 20');
            })

            .exception(function(){
              test.date(2010);
            })

            .exception(function(){
              test.date(Date);
            })
          ;
        })
      ;

    });

  });

  describe('Assertions of date()', function(){

    it('is(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .is(new Date('2010, 5, 20'))

        .case('Test failure', function(){

          test
            .exception(function(){
              test.date(date).is(/2010/);
            })

            .exception(function(){
              test.date(date).is(new Date('2011, 5, 20'));
            })
          ;

        })
      ;

    });

    it('isNot(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isNot(new Date('2012, 02, 28'))

        .case('Test failure', function(){

          test
            .exception(function(){
              test.date(date).isNot(new Date('2010, 5, 20'));
            })

            .exception(function(){
              test.date(date).isNot(date);
            })
          ;

        })
      ;

    });

    it('isIdenticalTo(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isIdenticalTo(date)

        .exception(function(){
          test.date(date).isIdenticalTo(new Date('2010, 5, 20'));
        })
      ;

    });

    it('isNotIdenticalTo(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isNotIdenticalTo(new Date('2010, 5, 20'))

        .exception(function(){
          test.date(date).isNotIdenticalTo(date);
        })
      ;

    });

    it('isEqualTo(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isEqualTo(date)

        .exception(function(){
          test.date(date).isEqualTo(new Date('2010, 5, 20'));
        })
      ;

    });

    it('isNotEqualTo(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isNotEqualTo(new Date('2010, 5, 20'))

        .exception(function(){
          test.date(date).isNotEqualTo(date);
        })
      ;

    });

    it('match(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .match(/2010/)

        .exception(function(){
          test.date(date).match(/03/);
        })
      ;

    });

    it('notMatch(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .notMatch(/03/)

        .exception(function(){
          test.date(date).notMatch(/02/);
        })
      ;

    });

    it('isValid(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isValid(/2010/)

        .exception(function(){
          test.date(date).isValid(/03/);
        })
      ;

    });

    it('isNotValid(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isNotValid(/03/)

        .exception(function(){
          test.date(date).isNotValid(/02/);
        })
      ;

    });

    it('isBetween(begin, end)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isBetween(new Date('1982, 02, 17'), new Date('2012, 02, 28'))

        .exception(function(){
          test.date(date).isBetween(
            new Date('2012, 02, 28'), new Date('1982, 02, 17')
          );
        })
      ;

    });

    it('isNotBetween(begin, end)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isNotBetween(new Date('2011, 02, 17'), new Date('2012, 02, 28'))

        .exception(function(){
          test.date(date).isNotBetween(
            new Date('1982, 02, 17'), new Date('2012, 02, 28')
          );
        })
      ;

    });

    it('isBefore(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isBefore(new Date('2012, 02, 28'))

        .exception(function(){
          test.date(date).isBefore(new Date('1982, 02, 17'));
        })
      ;

    });

    it('isAfter(expected)', function(){

      var date = new Date('2010, 5, 20');

      test
        .date(date)
          .isAfter(new Date('1982, 02, 17'))

        .exception(function(){
          test.date(date).isAfter(new Date('2012, 02, 28'));
        })
      ;

    });

  });
});