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

describe('Asserter object()', function(){

  describe('object() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      test
        .value(test.object({}).hasHeader)
          .isUndefined()

        .value(test.object({}).isError)
          .isUndefined()

        .value(test.object({}).hasMessage)
          .isUndefined()

        .value(test.object({}).isInfinite)
          .isUndefined()
      ;

    });

    it('Assert that the tested value is an `object`', function(){

      var Foo = function Foo(){};

      test
        .object({})
        .object([])
        .object(new Date())
        .object(new RegExp())
        .object(new Foo())

        .case('Test failure', function(){

          test
            .exception(function(){
              test.object('Foo');
            })

            .exception(function(){
              test.object(Foo);
            })

            .exception(function(){
              test.object(1);
            })

            .exception(function(){
              test.object(undefined);
            })

            .exception(function(){
              test.object(true);
            })

            .exception(function(){
              test.object(false);
            })

            .exception(function(){
              test.object(null);
            })

            .exception(function(){
              test.object(function(){});
            })
          ;
        })
      ;

    });

  });

  describe('Assertions of object()', function(){

    it('is(expected)', function(){

      test
        .object({fluent: 'is awesome', deep: [0, 1]})
          .is({fluent: 'is awesome', deep: [0, 1]})

        .exception(function(){
          test.object({fluent: 'is awesome', deep: [0, 1]})
            .is({fluent: 'is awesome', deep: [0, 2]});
        })
      ;
    });

    it('isNot(expected)', function(){

      test
        .object({fluent: 'is awesome', deep: [0, 1]})
          .isNot({fluent: 'is awesome', deep: [0, '1']})

        .exception(function(){
          test.object({fluent: 'is awesome', deep: [0, 1]})
            .isNot({fluent: 'is awesome', deep: [0, 1]});
        })
      ;
    });

    it('isIdenticalTo(expected)', function(){
      var
        obj = {},
        obj2 = obj
      ;

      test
        .object(obj)
          .isIdenticalTo(obj2)

        .exception(function(){
          test.object(obj).isIdenticalTo({});
        })
      ;
    });

    it('isNotIdenticalTo(expected)', function(){

      var
        obj = {},
        obj2 = obj
      ;

      test
        .object(obj)
          .isNotIdenticalTo({})

        .exception(function(){
          test.object(obj).isNotIdenticalTo(obj2);
        })
      ;
    });

    it('isEqualTo(expected)', function(){
      var
        obj = {},
        obj2 = obj
      ;

      test
        .object(obj)
          .isEqualTo(obj2)

        .exception(function(){
          test.object(obj).isEqualTo({});
        })
      ;
    });

    it('isNotEqualTo(expected)', function(){
      var
        obj = {foo: 'bar'},
        obj2 = obj
      ;

      test
        .object(obj)
          .isNotEqualTo({foo: 'bar', baz: 'bar'})

        .exception(function(){
          test.object(obj).isNotEqualTo(obj2);
        })
      ;
    });

    it('match(expected)', function(){

      test
        .object({hello: 'world'})
          .match(function(obj){
            return obj.hello == 'world';
          })

        .exception(function(){
          test.object({hello: 'world'})
            .match(function(obj){
              return obj.hello == 'foo';
            });
        })
      ;
    });

    it('notMatch(expected)', function(){

      test
        .object({hello: 'world'})
          .notMatch(function(obj){
            return obj.hello == 'E.T';
          })

        .exception(function(){

          test.object({hello: 'world'})
            .notMatch(function(obj){
              return obj.hello == 'world';
            })
        })
      ;
    });

    it('isValid(expected)', function(){

      test
        .object({hello: 'world'})
          .isValid(function(obj){
            return obj.hello == 'world';
          })

        .exception(function(){
          test.object({hello: 'world'})
            .isValid(function(obj){
              return obj.hello == 'foo';
            });
        })
      ;
    });

    it('isNotValid(expected)', function(){

      test
        .object({hello: 'world'})
          .isNotValid(function(obj){
            return obj.hello == 'E.T';
          })

        .exception(function(){

          test.object({hello: 'world'})
            .isNotValid(function(obj){
              return obj.hello == 'world';
            })
        })
      ;
    });

    it('matchEach(expected)', function(){

      test
        .object({foo: 'bar', hey: 'you', joker:1})
          .matchEach(function(it, key) {

            if(key == 'joker'){
              return (typeof it == 'number');
            }

            return (typeof it == 'string');
          })

        .exception(function(){

          // error if one or several does not match
          test.object({foo: 'bar', hey: 'you', joker:1})
            .matchEach(function(it, key) {

              return (typeof it == 'string');
            })
        })
      ;
    });

    it('notMatchEach(expected)', function(){

      test
        .object({foo: 'bar', hey: 'you', joker:1})
          .notMatchEach(function(it, key) {

            if(key == 'other'){
              return true;
            }
          })

        .exception(function(){

          // error if one or several does not match
          test.object({foo: 'bar', hey: 'you', joker:1})
            .notMatchEach(function(it, key) {

              if(key == 'foo'){
                return true;
              }
            })
        })

        .exception(function(){

          // error if one or several does not match
          test.object({foo: 'bar', hey: 'you', joker:1})
            .notMatchEach(function(it, key) {

              return (typeof it == 'string');
            })
        })
      ;
    });

    it('isArray()', function(){
      test
        .object([])
          .isArray()

        .exception(function(){
          test.object({}).isArray();
        })

        .exception(function(){
          test.object(new Date()).isArray();
        })
      ;
    });

    it('isRegExp()', function(){
      test
        .object(/[0-9]+/)
          .isRegExp()

        .exception(function(){
          test.object({}).isRegExp();
        })

        .exception(function(){
          test.object(new Date()).isRegExp();
        })
      ;
    });

    it('isNotRegExp()', function(){
      test
        .object(new Date())
          .isNotRegExp()

        .exception(function(){
           test.object(/[0-9]+/).isNotRegExp();
        })
      ;
    });

    it('isDate()', function(){
      test
        .object(new Date())
          .isDate()

        .exception(function(){
          test.object({}).isDate();
        })

        .exception(function(){
           test.object(/[0-9]+/).isDate();
        })
      ;
    });

    it('isNotDate()', function(){
      test
        .object(/[0-9]+/)
          .isNotDate()

        .exception(function(){
          test.object(new Date()).isNotDate();
        })
      ;
    });

    it('isArguments()', function(){

      var fn = function(){

        var args = arguments;

        test.object(arguments).isArguments();
        test.object(args).isArguments();
      };

      fn(1, 2, 3);

      test.exception(function(){
        test.object({0: 'a'}).isArguments();
      });
    });

    it('isNotArguments()', function(){

      var fn = function(){

        test
          .object(arguments)
            .isArguments()

          .object([1, 2, 3])
            .isNotArguments()

          .object({0:1, 1:2, 2:3})
            .isNotArguments()
        ;
      };

      fn(1, 2, 3);

      test.exception(function(){
        test.object(arguments).isNotArguments();
      });
    });

    it('isEmpty()', function(){
      test
        .object({})
          .isEmpty()

        .exception(function(){
          test.object({0: 'a'}).isEmpty();
        })
      ;
    });

    it('isNotEmpty()', function(){
      test
        .object({hello: 'Nico'})
          .isNotEmpty()

        .exception(function(){
          test.object({}).isNotEmpty();
        })
      ;
    });

    it('hasLength(expected)', function(){

      test
        .object({foo: 'bar', other: 'baz'})
          .hasLength(2)

        .exception(function(){
          test.object({foo: 'bar', other: 'baz'})
            .hasLength(3);
        })
      ;
    });

    it('hasNotLength(expected)', function(){

      test
        .object({foo: 'bar', other: 'baz'})
          .hasNotLength(4)

        .exception(function(){
          test.object({foo: 'bar', other: 'baz'})
            .hasNotLength(2);
        })
      ;
    });

    it('isEnumerable(property)', function(){

      test
        .object({prop: 'foobar'})
          .isEnumerable('prop')

        .exception(function(){
          test.object({prop: 'foobar'})
            .isEnumerable('length');
        })
      ;
    });

    it('isNotEnumerable(property)', function(){

      test
        .object(Object.create({}, {prop: {enumerable: 0}}))
          .isNotEnumerable('prop')

        .exception(function(){
          test.object({prop: 'foobar'})
            .isNotEnumerable('prop');
        })
      ;
    });

    it('isFrozen()', function(){
      test
        .object(Object.freeze({}))
          .isFrozen()

        .exception(function(){
          test.object({})
            .isFrozen();
        })
      ;
    });

    it('isNotFrozen()', function(){
      test
        .object({})
          .isNotFrozen()

        .exception(function(){
          test.object(Object.freeze({}))
            .isNotFrozen();
        })
      ;
    });

    it('isInstanceOf(expected)', function(){
      test
        .object(new Date())
          .isInstanceOf(Date)

        .exception(function(){
          test.object(new Date())
            .isInstanceOf(Error);
        })
      ;
    });

    it('isNotInstanceOf(expected)', function(){
      test
        .object(new Date())
          .isNotInstanceOf(RegExp)

        .exception(function(){
          test.object(new Date())
            .isNotInstanceOf(Object);
        })

        .exception(function(){
          test.object(new Date())
            .isNotInstanceOf(Date);
        })
      ;
    });

    it('hasProperty(property [, value])', function(){
      test
        .object({foo: 'bar'})
          .hasProperty('foo')

        .object({foo: 'bar'})
          .hasProperty('foo', 'bar')

        .exception(function(){
          test.object({foo: 'bar'})
            .hasProperty('bar');
        })

        .exception(function(){
          test.object({foo: 'bar'})
            .hasProperty('foo', 'ba');
        })
      ;
    });

    it('hasNotProperty(property [, value])', function(){
      test
        .object({foo: 'bar'})
          .hasNotProperty('bar')

        .object({foo: 'bar'})
          .hasNotProperty('foo', 'baz')

        .exception(function(){
          test.object({foo: 'bar'})
            .hasNotProperty('foo');
        })

        .exception(function(){
          test.object({foo: 'bar'})
            .hasNotProperty('foo', 'bar');
        })
      ;
    });

    it('hasOwnProperty(property [, value])', function(){
      test
        .object({foo: 'bar'})
          .hasOwnProperty('foo')

        .object({foo: 'bar'})
          .hasOwnProperty('foo', 'bar')

        .exception(function(){
          test.object({foo: 'bar'})
            .hasOwnProperty('bar');
        })

        .exception(function(){
          test.object({foo: 'bar'})
            .hasOwnProperty('foo', 'ba');
        })
      ;
    });

    it('hasNotOwnProperty(property [, value])', function(){
      test
        .object({foo: 'bar'})
          .hasNotOwnProperty('bar')

        .object({foo: 'bar'})
          .hasNotOwnProperty('foo', 'baz')

        .exception(function(){
          test.object({foo: 'bar'})
            .hasNotOwnProperty('foo');
        })

        .exception(function(){
          test.object({foo: 'bar'})
            .hasNotOwnProperty('foo', 'bar');
        })
      ;
    });

    it('hasProperties(properties)', function(){
      test
        .object({foo: 'bar', bar: 'huhu', other: 'vroom'})
          .hasProperties(['other', 'bar', 'foo'])

        .exception(function(){
          test.object({foo: 'bar', bar: 'huhu', other: 'vroom'})
            .hasProperties(['other', 'bar']);
        })
      ;
    });

    it('hasNotProperties(properties)', function(){
      test
        .object({foo: 'bar', bar: 'huhu', other: 'vroom'})
          .hasNotProperties(['other', 'foo'])

        .exception(function(){
          test.object({foo: 'bar', bar: 'huhu', other: 'vroom'})
            .hasNotProperties(['bar', 'other', 'foo']);
        })
      ;
    });

    it('hasOwnProperties(properties)', function(){
      test
        .object({foo: 'bar', bar: 'huhu', other: 'vroom'})
          .hasOwnProperties(['other', 'bar', 'foo'])

        .exception(function(){
          test.object({foo: 'bar', bar: 'huhu', other: 'vroom'})
            .hasOwnProperties(['other', 'bar']);
        })
      ;
    });

    it('hasKey(key [, value])', function(){
      test
        .object({foo: 'bar'})
          .hasKey('foo')

        .object({foo: 'bar'})
          .hasKey('foo', 'bar')

        .exception(function(){
          test.object({foo: 'bar'})
            .hasKey('bar');
        })

        .exception(function(){
          test.object({foo: 'bar'})
            .hasKey('foo', 'ba');
        })
      ;
    });

    it('notHasKey(key [, value])', function(){
      test
        .object({foo: 'bar'})
          .notHasKey('bar')

        .object({foo: 'bar'})
          .notHasKey('foo', 'baz')

        .exception(function(){
          test.object({foo: 'bar'})
            .notHasKey('foo');
        })

        .exception(function(){
          test.object({foo: 'bar'})
            .notHasKey('foo', 'bar');
        })
      ;
    });

    it('hasKeys(keys)', function(){
      test
        .object({foo: 'bar', bar: 'huhu', other: 'vroom'})
          .hasKeys(['other', 'bar', 'foo'])

        .exception(function(){
          test.object({foo: 'bar', bar: 'huhu', other: 'vroom'})
            .hasKeys(['other', 'bar']);
        })
      ;
    });

    it('notHasKeys(keys)', function(){
      test
        .object({foo: 'bar', bar: 'huhu', other: 'vroom'})
          .notHasKeys(['other', 'foo'])

        .exception(function(){
          test.object({foo: 'bar', bar: 'huhu', other: 'vroom'})
            .notHasKeys(['bar', 'other', 'foo']);
        })
      ;
    });

    it('hasValue(expected)', function(){

      test
        .object({life: 42, love: 69})
          .hasValue(42)

        .exception(function(){
          test.object({life: 42, love: 69})
            .hasValue('42');
        })
      ;
    });

    it('notHasValue(expected)', function(){

      test
        .object({life: 42, love: 69})
          .notHasValue(4)

        .exception(function(){
          test.object({life: 42, love: 69})
            .notHasValue(42);
        })
      ;
    });

    it('hasValues(expected)', function(){

      test
        .object({life: 42, love: 69})
          .hasValues([42, 69])

        .exception(function(){
          test.object([1, 42, 3])
            .hasValues([42, 3.01]);
        })
      ;
    });

    it('notHasValues(expected)', function(){

      test
        .object({life: 42, love: 69})
          .notHasValues([43, 68])

        .exception(function(){
          test.object([1, 42, 3])
            .notHasValues([1, 42, 3]);
        })
      ;
    });

    it('contains(expected [, ...])', function(){

      test
        .object({ a: { b: 10 }, b: { c: 10, d: 11, a: { b: 10, c: 11} }})
        .contains({ a: { b: 10 }, b: { c: 10, a: { c: 11 }}})

        .object({a: 'a', b: {c: 'c'}})
          .contains({b: {c: 'c'}})
          .contains({b: {c: 'c'}}, {a: 'a'})

        .exception(function(){
          test.object({foo: {a: 'a'}, bar: {b: 'b', c: 'c'}})
            .contains({foo: {a: 'a'}}, {bar: {b: 'c'}});
        })
      ;
    });

    it('notContains(expected [, ...])', function(){

      test
        .object({a: 'a'}, {b: 'b', c: 'c'})
          .notContains({c: 'b'})

        .exception(function(){
          test.object({foo: {a: 'a'}, bar: {b: 'b', c: 'c'}})
            .notContains({foo: {a: 'a'}, bar: {c: 'c'}});
        })
      ;
    });

    it('hasName(expected)', function(){

      test
        .object(new Date(2010, 5, 28))
          .hasName('Date')

        .exception(function(){
          test.object(new Date(2010, 5, 28))
            .hasName('date');
        })
      ;
    });

  });
});