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

describe('Asserter regexp()', function(){

  describe('regexp() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      test
        .value(test.regexp(new RegExp()).hasHeader)
          .isUndefined()

        .value(test.regexp(new RegExp()).hasMessage)
          .isUndefined()

        .value(test.regexp(new RegExp()).isInfinite)
          .isUndefined()
      ;
    });

    it('Assert that the tested value is an instance of `RegExp`', function(){

      test
        .regexp(/foobar/)
        .regexp(new RegExp('foo', 'i'))

        .case('Test failure', function(){

          test
            .exception(function(){
              test.regexp({});
            })

            .exception(function(){
              test.regexp([]);
            })

            .exception(function(){
              test.regexp('');
            })

            .exception(function(){
              test.regexp();
            })

            .exception(function(){
              test.regexp(undefined);
            })

            .exception(function(){
              test.regexp(null);
            })

            .exception(function(){
              test.regexp(true);
            })

            .exception(function(){
              test.regexp(false);
            })

            .exception(function(){
              test.regexp(0);
            })

            .exception(function(){
              test.regexp(1);
            })

            .exception(function(){
              test.regexp('[a-z]');
            })

            .exception(function(){
              test.regexp('/foobar/');
            })

            .exception(function(){
              test.regexp(RegExp);
            })

            .exception(function(){
              test.regexp(new Date());
            })
          ;

        })
      ;

    });

  });

  describe('Assertions of regexp()', function(){

    it('is(expected)', function(){

      var regexp = new RegExp(/[a-z]/);

      test
        .regexp(regexp)
          .is(new RegExp(/[a-z]/))

        .exception(function(){
          test.regexp(regexp).is(/A-Z/);
        })
      ;

    });

    it('isNot(expected)', function(){

      var regexp = new RegExp(/[a-z]/);

      test
        .regexp(regexp)
          .isNot(new RegExp(/[A-Z]/))

        .exception(function(){
          test.regexp(regexp).isNot(/[a-z]/);
        })
      ;

    });

    it('isIdenticalTo(expected)', function(){

      var
        regexp = new RegExp(/[a-z]/),
        ref = regexp
      ;

      test
        .regexp(regexp)
          .isIdenticalTo(ref)

        .exception(function(){
          test.regexp(regexp).isIdenticalTo(/[a-z]/);
        })
      ;

    });

    it('isNotIdenticalTo(expected)', function(){

      var regexp = new RegExp(/[a-z]/);

      test
        .regexp(regexp)
          .isNotIdenticalTo(new RegExp(/[a-z]/))

        .exception(function(){
          test.regexp(regexp).isNotIdenticalTo(regexp);
        })
      ;

    });

    it('isEqualTo(expected)', function(){

      var
        regexp = new RegExp(/[a-z]/),
        ref = regexp
      ;

      test
        .regexp(regexp)
          .isEqualTo(ref)

        .exception(function(){
          test.regexp(regexp).isEqualTo(/[a-z]/);
        })
      ;

    });

    it('isNotEqualTo(expected)', function(){

      var regexp = new RegExp(/[a-z]/);

      test
        .regexp(regexp)
          .isNotEqualTo(new RegExp(/[a-z]/))

        .exception(function(){
          test.regexp(regexp).isNotEqualTo(regexp);
        })
      ;

    });

    it('match(expected)', function(){

      var
        regexp = new RegExp(/[a-z]/),
        ref = regexp
      ;

      test
        .regexp(regexp)
          .match(function(reg){
            return reg === ref;
          })

        .exception(function(){
          test.regexp(regexp).match(function(actual){
            return actual.source == '[A-Z]';
          });
        })
      ;

    });

    it('notMatch(expected)', function(){

      var
        regexp = new RegExp(/[a-z]/),
        ref = regexp
      ;

      test
        .regexp(regexp)
          .notMatch(function(actual){
            var reg = new RegExp(/[a-z]/);
            return reg === ref || reg === actual;
          })

        .exception(function(){
          test.regexp(regexp).notMatch(function(actual){
            return actual.source == '[a-z]';
          });
        })
      ;

    });

    it('isValid(expected)', function(){

      var
        regexp = new RegExp(/[a-z]/),
        ref = regexp
      ;

      test
        .regexp(regexp)
          .isValid(function(reg){
            return reg === ref;
          })

        .exception(function(){
          test.regexp(regexp).isValid(function(actual){
            return actual.source == '[A-Z]';
          });
        })
      ;

    });

    it('isNotValid(expected)', function(){

      var
        regexp = new RegExp(/[a-z]/),
        ref = regexp
      ;

      test
        .regexp(regexp)
          .isNotValid(function(actual){
            var reg = new RegExp(/[a-z]/);
            return reg === ref || reg === actual;
          })

        .exception(function(){
          test.regexp(regexp).isNotValid(function(actual){
            return actual.source == '[a-z]';
          });
        })
      ;

    });

    it('isEnumerable(property)', function(){

      var regexp = new RegExp(/[a-z]/);

      // define an enumerable property
      Object.defineProperty(regexp, 'myCustom', {
        enumerable: true, value: 'static'
      });

      test
        .regexp(regexp)
          .isEnumerable('myCustom')

        .exception(function(){
          test.regexp(regexp).isEnumerable('ignoreCase');
        })
      ;

    });

    it('isNotEnumerable(property)', function(){

      var regexp = new RegExp(/[a-z]/);

      // define an enumerable property
      Object.defineProperty(regexp, 'myCustom', {
        enumerable: true, value: 'static'
      });

      test
        .regexp(regexp)
          .isNotEnumerable('lastIndex')
          .isNotEnumerable('ignoreCase')
          .isNotEnumerable('multiline')

        .exception(function(){
          test.regexp(regexp).isNotEnumerable('myCustom');
        })
      ;

    });

    it('isFrozen', function(){

      var regexp = new RegExp(/[a-z]/);
      Object.freeze(regexp);

      test
        .regexp(regexp)
          .isFrozen()

        .exception(function(){
          test.regexp(/[a-z]/).isFrozen();
        })
      ;

    });

    it('isNotFrozen', function(){

      var
        regexp = new RegExp(/[a-z]/),
        regexpFrozen = new RegExp(/[a-z]/)
      ;

      Object.freeze(regexpFrozen);

      test
        .regexp(regexp)
          .isNotFrozen()

        .exception(function(){
          test.regexp(regexpFrozen).isNotFrozen();
        })
      ;

    });

    it('hasProperty(property [, value])', function(){

      test
        .regexp(/[a-z]/)
          .hasProperty('lastIndex')
          .hasProperty('constructor')

        .exception(function(){
          test.regexp(/[a-z]/).hasProperty('foo');
        })
      ;

    });

    it('hasNotProperty(property [, value])', function(){
      test
        .regexp(/[a-z]/)
          .hasNotProperty('foobar')

        .exception(function(){
          test.regexp(/[a-z]/).hasNotProperty('lastIndex');
        })
      ;
    });

    it('hasOwnProperty(property [, value])', function(){
      test
        .regexp(/[a-z]/)
          .hasOwnProperty('lastIndex')

        .exception(function(){
          test.regexp(/[a-z]/).hasOwnProperty('constructor');
        })
      ;
    });

    it('hasNotOwnProperty(property [, value])', function(){
      test
        .regexp(/[a-z]/)
          .hasNotOwnProperty('constructor')

        .exception(function(){
          test.regexp(/[a-z]/).hasNotOwnProperty('lastIndex');
        })
      ;
    });

    it('hasKey(key [,value ])', function(){
      test
        .regexp(/[a-z]/)
          .hasKey('lastIndex')
          .hasKey('constructor')

        .exception(function(){
          test.regexp(/[a-z]/).hasKey('foo');
        })
      ;
    });

    it('notHasKey(key [,value])', function(){
      test
        .regexp(/[a-z]/)
          .notHasKey('foobar')

        .exception(function(){
          test.regexp(/[a-z]/).notHasKey('lastIndex');
        })
      ;
    });

  });
});