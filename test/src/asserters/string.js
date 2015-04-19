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

describe('Asserter string()', function(){

  describe('string() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      test
        .value(test.string('').hasHeader)
          .isUndefined()

        .value(test.string('').hasProperty)
          .isUndefined()

        .value(test.string('').hasMessage)
          .isUndefined()

        .value(test.string('').isInfinite)
          .isUndefined()
      ;

    });

    it('Assert that the tested value is a `string`', function(){

      test
        .string('')
        .string('Hello')

        .case('Test failure', function(){

          test
            .exception(function(){
              test.string();
            })

            .exception(function(){
              test.string({});
            })

            .exception(function(){
              test.string([]);
            })

            .exception(function(){
              test.string(1);
            })

            .exception(function(){
              test.string(/foobar/);
            })

            .exception(function(){
              test.string(true);
            })

            .exception(function(){
              test.string(false);
            })

            .exception(function(){
              test.string(null);
            })

            .exception(function(){
              test.string(undefined);
            })
          ;
        })
      ;
    });
  });

  describe('Assertions of string()', function(){

    it('is(expected)', function(){

      var str = 'Hello world !';

      test
        .string(str)
          .is('Hello world !')

        .exception(function(){
          test.string(str).is('foo');
        })
      ;

    });

    it('isNot(expected)', function(){

      var str = 'Hello world !';

      test
        .string(str)
          .isNot('hello world !')

        .exception(function(){
          test.string(str).isNot('Hello world !');
        })
      ;

    });

    it('isIdenticalTo(expected)', function(){

      var str = 'Hello world !';

      test
        .string(str)
          .isIdenticalTo('Hello world !')

        .exception(function(){
          test.string(str).isIdenticalTo('Hello World !');
        })
      ;

    });

    it('isNotIdenticalTo(expected)', function(){

      var str = 'Hello world !';

      test
        .string(str)
          .isNotIdenticalTo('hello world !')

        .exception(function(){
          test.string(str).isNotIdenticalTo('Hello world !');
        })
      ;

    });

    it('isEqualTo(expected)', function(){

      var str = 'Hello world !';

      test
        .string(str)
          .isEqualTo('Hello world !')

        .exception(function(){
          test.string(str).isEqualTo('Hello World !');
        })
      ;

    });

    it('isNotEqualTo(expected)', function(){

      var str = 'Hello world !';

      test
        .string(str)
          .isNotEqualTo('hello world !')

        .exception(function(){
          test.string(str).isNotEqualTo('Hello world !');
        })
      ;

    });

    it('match(expected)', function(){

      // Assert a string value with a expected string
      test.string('Hello').match('Hello');

      // Assert a string value with a RegExp
      test.string('Hello world !').match(/world/i);

      // Assert a string with a function
      test.string('hello').match(function(it){
        return it === 'hello';
      });

      test.exception(function(){
        test.string('hello').match(/foo/);
      });

    });

    it('notMatch(expected)', function(){

      test
        .string('foobar')
          .notMatch('some value')
          .notMatch(/[foo]+bazzz$/)

        .string('foo')
          .notMatch(function(it){
            return it === 'bar';
          })

        .exception(function(){
          test.string('Hello Nico!').notMatch(/nico/i);
        })
      ;

    });

    it('isValid(expected)', function(){

      // Assert a string value with a expected string
      test.string('Hello').isValid('Hello');

      // Assert a string value with a RegExp
      test.string('Hello world !').isValid(/world/i);

      // Assert a string with a function
      test.string('hello').isValid(function(it){
        return it === 'hello';
      });

      test.exception(function(){
        test.string('hello').isValid(/foo/);
      });

    });

    it('isNotValid(expected)', function(){

      test
        .string('foobar')
          .isNotValid('some value')
          .isNotValid(/[foo]+bazzz$/)

        .string('foo')
          .isNotValid(function(it){
            return it === 'bar';
          })

        .exception(function(){
          test.string('Hello Nico!').notMatch(/nico/i);
        })
      ;

    });

    it('matchEach(expected)', function(){

      var str = 'Hello Nico!';

      test
        .string(str)
          .matchEach([/hello/i, 'Nico', function(it){
            return it === 'Hello Nico!';
          }])

        .case('Test failure', function(){

          test
            .exception(function(){
              test.string(str).matchEach([/hello/i, 'nico', function(it){
                return it === 'Hello Nico!';
              }]);
            })

            .exception(function(){
              test.string(str).matchEach([/hello/i, 'Nico', function(it){
                return it === 'Hello nico!';
              }]);
            })
          ;
        })
      ;
    });

    it('notMatchEach(expected)', function(){

      var str = 'Hello Nico!';

      test
        .string(str)
          .notMatchEach([/foo/i, 'bad word', function(it){
            return it === 'Bye';
          }])

        .case('Test failure', function(){

          test
            .exception(function(){
              test.string(str).notMatchEach([/hello/, 'Nico', function(it){
                return it === 'Hello !';
              }]);
            })

            .exception(function(){
              test.string(str).notMatchEach([/hello/, 'nico', function(it){
                return it === 'Hello Nico!';
              }]);
            })
          ;
        })
      ;

    });

    it('isEmpty()', function(){
      test
        .string('')
          .isEmpty()

        .exception(function(){
          test.string(str).isEmpty();
        })
      ;
    });

    it('isNotEmpty()', function(){
      test
        .string('a')
          .isNotEmpty()

        .exception(function(){
          test.string('').isNotEmpty();
        })
      ;
    });

    it('hasLength(expected)', function(){
      test
        .string('Hello Nico')
          .hasLength(10)

        .exception(function(){
          test.string('abc').hasLength(4);
        })
      ;
    });

    it('hasNotLength(expected)', function(){
      test
        .string('Hello Nico')
          .hasNotLength(11)

        .exception(function(){
          test.string('abc').hasNotLength(3);
        })
      ;
    });

    it('hasValue(expected)', function(){
      test
        .string('Hello, Nico!')
          .hasValue('Nico')

        .exception(function(){
          test.string('Hello').hasValue('hello');
        })
      ;
    });

    it('notHasValue(expected)', function(){
      test
        .string('Hello, Nico!')
          .notHasValue('Bye')

        .exception(function(){
          test.string('Hello').notHasValue('Hello');
        })
      ;
    });

    it('hasValues(expected)', function(){
      test
        .string('Hello Nico!')
          .hasValues(['Hello', 'Nico'])

        .exception(function(){
          test.string('Hello Nico!').hasValues(['Hi', 'Nico']);
        })
      ;
    });

    it('notHasValues(expected)', function(){
      test
        .string('Sarah Connor ?')
          .notHasValues(['next', 'door'])

        .exception(function(){
          test.string('Hello Nico!').notHasValues(['Hi', 'Nico']);
        })

      ;
    });

    it('contains(expected [, ...])', function(){
      test
        .string('hello boy')
          .contains('boy')

        .string('KISS principle : Keep it Simple, Stupid')
          .contains('Simple', 'principle', ':')

        .exception(function(){
          test.string('Hello').contains('hello');
        })
      ;
    });

    it('notContains(expected [, ...])', function(){
      test
        .string('hello boy')
          .notContains('bye')

        .exception(function(){
          test.string('Hello').notContains('Hello');
        })
      ;
    });

    it('startsWith(str)', function(){
      test
        .string('foobar')
          .startsWith('foo')

        .exception(function(){
          test.string('Hello the world').startsWith('world');
        })
      ;
    });

    it('notStartsWith(str)', function(){
      test
        .string('foobar')
          .notStartsWith('bar')

        .exception(function(){
          test.string('Hello the world').notStartsWith('Hello');
        })
      ;
    });

    it('endsWith(str)', function(){
      test
        .string('foobar')
          .endsWith('bar')

        .exception(function(){
          test.string('Hello the world').endsWith('Hello');
        })
      ;
    });

    it('notEndsWith(str)', function(){
      test
        .string('foobar')
          .notEndsWith('foo')

        .exception(function(){
          test.string('Hello the world').notEndsWith('world');
        })
      ;
    });

  });
});