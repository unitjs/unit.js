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

// object
var rawAssertions = require('../../../src/assertions');


describe('Asserter value()', function(){

  describe('value() behavior', function(){

    it('value() has all assertions', function(){

      var assertions = rawAssertions.call(this, undefined);

      for(var method in assertions){
        test.value(test.value(undefined)[method]).exists();
      }

      // ensures the test method
      test.exception(function(){
        test.value(test.value(undefined)['foobar_not_exist']).exists();
      });
    });

  });

  describe('Assertions of value()', function(){

    it('is(expected)', function(){
      test
        .value({fluent: 'is awesome', deep: [0, 1]})
          .is({fluent: 'is awesome', deep: [0, 1]})

        .exception(function(){
          test.value({fluent: 'is awesome', deep: [0, 1]})
            .is({fluent: 'is awesome', deep: [0, 2]});
        })
      ;
    });

    it('isNot(expected)', function(){
      test
        .value({fluent: 'is awesome', deep: [0, 1]})
          .isNot({fluent: 'is awesome', deep: [0, '1']})

        .exception(function(){
          test.value({fluent: 'is awesome', deep: [0, 1]})
            .isNot({fluent: 'is awesome', deep: [0, 1]});
        })
      ;
    });

    it('isIdenticalTo(expected)', function(){
      test
        .value(1)
          .isIdenticalTo(1)

        .exception(function(){
          test.value(1).isIdenticalTo(2);
        })
      ;
    });

    it('isNotIdenticalTo(expected)', function(){
      test
        .value('1')
          .isNotIdenticalTo(1)

        .exception(function(){
          test.value(1).isNotIdenticalTo(1);
        })
      ;
    });

    it('isEqualTo(expected)', function(){
      test
        .value('1')
          .isEqualTo(1)

        .exception(function(){
          test.value(1).isEqualTo(1.1);
        })
      ;
    });

    it('isNotEqualTo(expected)', function(){
      test
        .value('foobar')
          .isNotEqualTo([])

        .exception(function(){
          test.value('foobar').isNotEqualTo('foobar');
        })
      ;
    });

    it('match(expected)', function(){
      test
        .value('foobar')
          .match(/[fo]+bar$/)

        .value(['a', 'b', 'c'])
          .match(/[a-z]/)

        .value(10)
          .match(10)

        .exception(function(){
          test.value('foobar').match('whoops');
        })
      ;
    });

    it('notMatch(expected)', function(){
      test
        .value('foobar')
          .notMatch(/[foo]+bazzz$/)

        .value(['a', 'b', 'c'])
          .notMatch(/[d-z]/)

        .value(10)
          .notMatch(8)

        .exception(function(){
          test.value('foobar').notMatch('foobar');
        })
      ;
    });

    it('matchEach(expected)', function(){
      test
        .value([10, 11, 12])
          .matchEach(function(it) {
            return it >= 10;
          })

        .exception(function(){

          // error if one or several does not match
          test.value([10, 11, 12]).matchEach(function(it) {
            return it >= 11;
          });
        })
      ;
    });

    it('notMatchEach(expected)', function(){
      test
        .value([10, 11, 12])
          .notMatchEach(function(it) {
            return it >= 13;
          })

        .exception(function(){

          // error all match
          test.value([10, 11, 12]).notMatchEach(function(it) {
            return it >= 11;
          });
        })
      ;
    });

    it('isValid(expected)', function(){
      test
        .value(42)
          .isValid(function(actual) {
            return actual === 42;
          })

        .exception(function(){
          test.value(42).isValid(function(actual) {
            return actual === 'expected value';
          });
        })
      ;
    });

    it('isNotValid(expected)', function(){
      test
        .value(42)
          .isNotValid(function(actual) {
            return actual === 44;
          })

        .exception(function(){
          test.value(42).isNotValid(function(actual) {
            return actual === 42;
          });
        })
      ;
    });

    it('isType(expected)', function(){
      test
        .value('foobar').isType('string')

        .value(0).isType('number')

        .value(1).isType('number')

        .value(1.2).isType('number')

        .value('1').isType('string')

        .value({}).isType('object')

        .value(undefined).isType('undefined')

        .value(null).isType('object')

        .value(true).isType('boolean')

        .value(false).isType('boolean')

        .exception(function(){
          test.value('1').isType('number');
        })
      ;
    });

    it('isNotType(expected)', function(){
      test
        .value({}).isNotType('string')

        .value('0').isNotType('number')

        .value('1').isNotType('number')

        .value('1.2').isNotType('number')

        .value(1).isNotType('string')

        .value(null).isNotType('undefined')

        .value(undefined).isNotType('object')

        .value('true').isNotType('boolean')

        .value('false').isNotType('boolean')

        .exception(function(){
          test.value('1').isNotType('string');
        })
      ;
    });

    it('isObject()', function(){
      test
        .value({})
          .isObject()

        .exception(function(){
          test.value(function(){}).isObject();
        })
      ;
    });

    it('isArray()', function(){
      test
        .value([])
          .isArray()

        .exception(function(){
          test.value({}).isArray();
        })
      ;
    });

    it('isFunction()', function(){
      test
        .value(function(){})
          .isFunction()

        .exception(function(){
          test.value(new Date()).isFunction();
        })
      ;
    });

    it('isString()', function(){
      test
        .value('foobar')
          .isString()

        .exception(function(){
          test.value(10.2).isString();
        })
      ;
    });

    it('isNumber()', function(){
      test
        .value(42)
          .isNumber()

        .exception(function(){
          test.value(true).isNumber();
        })
      ;
    });

    it('isBool() - alias of isBoolean()', function(){
      test
        .value(false)
          .isBool()

        .exception(function(){
          test.value(null).isBool();
        })
      ;
    });

    it('isBoolean()', function(){
      test
        .value(true)
          .isBoolean()

        .exception(function(){
          test.value(undefined).isBoolean();
        })
      ;
    });

    it('isNull()', function(){
      test
        .value(null)
          .isNull()

        .exception(function(){
          test.value(false).isNull();
        })

        .exception(function(){
          test.value(undefined).isNull();
        })

        .exception(function(){
          test.value(0).isNull();
        })
      ;
    });

    it('isUndefined()', function(){
      test
        .value(undefined)
          .isUndefined()

        .exception(function(){
          test.value(null).isUndefined();
        })
      ;
    });

    it('isRegExp()', function(){
      test
        .value(/[0-9]+/)
          .isRegExp()

        .exception(function(){
          test.value('/[0-9]+/').isRegExp();
        })
      ;
    });

    it('isNotRegExp()', function(){
      test
        .value(new Date())
          .isNotRegExp()

        .exception(function(){
          test.value(/foo/).isNotRegExp();
        })
      ;
    });

    it('isDate()', function(){
      test
        .value(new Date())
          .isDate()

        .exception(function(){
          test.value({month:5, year:2012, day:12}).isDate();
        })
      ;
    });

    it('isNotDate()', function(){
      test
        .value(/[0-9]+/)
          .isNotDate()

        .exception(function(){
          test.value(new Date()).isNotDate();
        })
      ;
    });

    it('isArguments()', function(){

      var fn = function(){
        test.value(arguments).isArguments();
      };

      fn(1, 2, 3);

      test.exception(function(){
        test.value({0: 'a'}).isArguments();
      });

    });

    it('isNotArguments()', function(){

      var fn = function(){

        test
          .value([1, 2, 3])
            .isNotArguments()

          .value({0:1, 1:2, 2:3})
            .isNotArguments()

          .exception(function(){
            test.value(arguments).isNotArguments();
          })
        ;
      };

      fn(1, 2, 3);
    });

    it('isTrue()', function(){
      test
        .value(true)
          .isTrue()

        .exception(function(){
          test.value(1).isTrue();
        })
      ;
    });

    it('isNotTrue()', function(){

      test
        .value(false)
          .isNotTrue()

        .value(1)
          .isNotTrue()

        .value('1')
          .isNotTrue()

        .value('true')
          .isNotTrue()

        .exception(function(){
          test.value(true).isNotTrue();
        })
      ;
    });

    it('isTruthy()', function(){
      test
        .value(true)
          .isTruthy()

        .value(1)
          .isTruthy()

        .value('ok')
          .isTruthy()

        .exception(function(){
          test.value('').isTruthy();
        })
      ;
    });

    it('isNotTruthy()', function(){
      test
        .value(0)
          .isNotTruthy()

        .exception(function(){
          test.value('1').isNotTruthy();
        })
      ;
    });

    it('isFalse()', function(){
      test
        .value(false)
          .isFalse()

        .exception(function(){
          test.value(null).isFalse();
        })
      ;
    });

    it('isNotFalse()', function(){

      test
        .value(true)
          .isNotFalse()

        .value(0)
          .isNotFalse()

        .value('0')
          .isNotFalse()

        .value('false')
          .isNotFalse()

        .value(null)
          .isNotFalse()

        .value(undefined)
          .isNotFalse()

        .exception(function(){
          test.value(false).isNotFalse();
        })
      ;
    });

    it('isFalsy()', function(){
      test
        .value(false)
          .isFalsy()

        .value(0)
          .isFalsy()

        .value('')
          .isFalsy()

        .value(null)
          .isFalsy()

        .value(undefined)
          .isFalsy()

        .exception(function(){
          test.value(1).isFalsy();
        })
      ;
    });

    it('isNotFalsy()', function(){
      test
        .value(1)
          .isNotFalsy()

        .exception(function(){
          test.value(undefined).isNotFalsy();
        })
      ;
    });

    it('isEmpty()', function(){
      test
        .value('')
          .isEmpty()

        .value([])
          .isEmpty()

        .value({})
          .isEmpty()

        .exception(function(){
          test.value(1).isEmpty();
        })
      ;
    });

    it('isNotEmpty()', function(){
      test
        .value('a')
          .isNotEmpty()

        .exception(function(){
          test.value('').isNotEmpty();
        })

        .exception(function(){
          test.value({}).isNotEmpty();
        })
      ;
    });

    it('isNaN()', function(){
      test
        .value(NaN)
          .isNaN()

        .value(new Number(NaN))
          .isNaN()

        .value(0/0)
          .isNaN()

        .value(parseInt('a', 10))
          .isNaN()

        .exception(function(){
          test.value(1).isNaN();
        })

        .exception(function(){
          test.value(new Number(1)).isNaN();
        })

        .exception(function(){
          test.value(undefined).isNaN();
        })

        .exception(function(){
          test.value(null).isNaN();
        })

        .exception(function(){
          test.value(false).isNaN();
        })

        .exception(function(){
          test.value(true).isNaN();
        })

        .exception(function(){
          test.value(0).isNaN();
        })

        .exception(function(){
          test.value({}).isNaN();
        })

        .exception(function(){
          test.value([]).isNaN();
        })
      ;
    });

    it('isNotNaN()', function(){
      test
        .value(1)
          .isNotNaN()

        .value(new Number(1))
          .isNotNaN()

        .value(undefined)
          .isNotNaN()

        .value(null)
          .isNotNaN()

        .value(false)
          .isNotNaN()

        .value(true)
          .isNotNaN()

        .value(0)
          .isNotNaN()

        .value({})
          .isNotNaN()

        .value([])
          .isNotNaN()

        .exception(function(){
          test.value(NaN).isNotNaN();
        })

        .exception(function(){
          test.value(new Number(NaN)).isNotNaN();
        })

        .exception(function(){
          test.value(0/0).isNotNaN();
        })

        .exception(function(){
          test.value(parseInt('a', 10)).isNotNaN();
        })
      ;
    });

    it('exists()', function(){
      test
        .value('foobar')
          .exists()

        .exception(function(){
          test.value(null).exists();
        })
      ;
    });

    it('isError() - alias of throws(Error)', function(){

      var trigger = function(){
        throw new Error('Whoops!');
      };

      test
        .value(trigger)
          .isError()

        .case('Test failure', function(){

          test
            .value(function(){

              test.value(function(){
                throw {name: 'error', message: 'Whoops'};
              })
              .isError();
            })
            .throws()

            .value(function(){

              test.value(function(){
                throw Error; // <= not instanciated
              })
              .isError();
            })
            .throws()
          ;
        })
      ;
    });

    it('throws([constructor], [expected])', function(){

      var indicator, trigger = function(){
        throw new Error("I'm a ninja !");
      };

      test
        .value(trigger)
          .throws()
          .throws("I'm a ninja !")
          .throws(/ninja/)
          .throws(Error)
          .throws(Error, "I'm a ninja !")
          .throws(Error, /ninja/)
          .throws(function(err) {

            if ((err instanceof Error) && /ninja/.test(err) ) {

              indicator = true; // just for test and example
              return true;
            }
          })

        // 'then' does nothing, it's just to make the test more expressive
        .then()
          .bool(indicator)
            .isTrue()

        .exception(function(){
          test.value(function(){
            return true;
          })
          .throws();
        })
      ;

    });

    it('hasLength(expected)', function(){
      test
        .value([1, 2])
          .hasLength(2)

        .value('Hello Nico')
          .hasLength(10)

        .exception(function(){
          test.value('Hello Nico').hasLength(2);
        })
      ;
    });

    it('hasNotLength(expected)', function(){
      test
        .value([1, 2])
          .hasNotLength(1)

        .value('Hello Nico')
          .hasNotLength(11)

        .exception(function(){
          test.value('Hello Nico').hasNotLength(10);
        })
      ;
    });

    it('isBetween(begin, end)', function(){
      test
        .value(2)
          .isBetween(2, 4)

        .value(3)
          .isBetween(2, 4)

        .value(4)
          .isBetween(2, 4)

        .exception(function(){
          test.value(2).isBetween(4, 2);
        })
      ;
    });

    it('isNotBetween(begin, end)', function(){
      test
        .value(1)
          .isNotBetween(2, 4)

        .value(5)
          .isNotBetween(2, 4)

        .exception(function(){
          test.value(2).isNotBetween(2, 2);
        })
      ;
    });

    it('isBefore(expected)', function(){
      test
        .value(new Date(2010, 5, 20))
          .isBefore(new Date(2012, 2, 28))

        .exception(function(){
          test.value(new Date(2012, 2, 28))
            .isBefore(new Date(1982, 2, 17));
        })
      ;
    });

    it('isAfter(expected)', function(){
      test
        .value(new Date(2012, 2, 28))
          .isAfter(new Date(2010, 5, 20))

        .exception(function(){
          test.value(new Date(2012, 2, 28))
            .isAfter(new Date(2014, 2, 28));
        })
      ;
    });

    it('isLessThan(expected)', function(){
      test
        .value(1)
          .isLessThan(2)

        .exception(function(){
          test.value(1).isLessThan(0.98);
        })
      ;
    });

    it('isGreaterThan(expected)', function(){
      test
        .value(2)
          .isGreaterThan(1)

        .exception(function(){
          test.value(1).isGreaterThan(1.00000001);
        })
      ;
    });

    it('isApprox(num, delta)', function(){
      test
        .value(99.98)
          .isApprox(100, 0.1)

        .exception(function(){
          test.value(99.98)
            .isApprox(100, 0.01);
        })
      ;
    });

    it('isInfinite()', function(){
      test
        .value(1/0)
          .isInfinite()

        .exception(function(){
          test.value(1.333333333333333333333)
            .isInfinite();
        })
      ;
    });

    it('isNotInfinite()', function(){
      test
        .value(1.3333333333333333333333333)
          .isNotInfinite()

        .exception(function(){
          test.value(1/0)
            .isNotInfinite();
        })
      ;
    });


    it('isEnumerable(property)', function(){
      test
        .value({prop: 'foobar'})
          .isEnumerable('prop')

        .exception(function(){
          test.value(function() {})
            .isEnumerable('call');
        })
      ;
    });

    it('isNotEnumerable(property)', function(){
      test
        .value(function() {})
          .isNotEnumerable('call')

        .value(Object.create({}, {prop: {enumerable: 0}}))
          .isNotEnumerable('prop')

        .exception(function(){
          test.value({prop: 'foobar'})
            .isNotEnumerable('prop');
        })
      ;
    });

    it('isFrozen()', function(){
      test
        .value(Object.freeze({}))
          .isFrozen()

        .exception(function(){
          test.value({})
            .isFrozen();
        })
      ;
    });

    it('isNotFrozen()', function(){
      test
        .value({})
          .isNotFrozen()

        .exception(function(){
          test.value(Object.freeze({}))
            .isNotFrozen();
        })
      ;
    });

    it('isInstanceOf(expected)', function(){
      test
        .value(new Date())
          .isInstanceOf(Date)

        .exception(function(){
          test.value(new Date())
            .isInstanceOf(Array);
        })
      ;
    });

    it('isNotInstanceOf(expected)', function(){
      test
        .value(new Date())
          .isNotInstanceOf(RegExp)

        .exception(function(){
          test.value(new Date())
            .isNotInstanceOf(Object);
        })
      ;
    });

    it('hasProperty(property [, value])', function(){
      test
        .value({foo: 'bar'})
          .hasProperty('foo')

        .value({foo: 'bar'})
          .hasProperty('foo', 'bar')

        .exception(function(){
          test.value({})
            .hasProperty('foo');
        })
      ;
    });

    it('hasNotProperty(property [, value])', function(){
      test
        .value({foo: 'bar'})
          .hasNotProperty('bar')

        .value({foo: 'bar'})
          .hasNotProperty('foo', 'baz')

        .exception(function(){
          test.value({foo: 'bar'})
            .hasNotProperty('foo');
        })
      ;
    });

    it('hasOwnProperty(property [, value])', function(){
      test
        .value({foo: 'bar'})
          .hasOwnProperty('foo')

        .value({foo: 'bar'})
          .hasOwnProperty('foo', 'bar')

        .exception(function(){
          test.value(new RegExp('foo'))
            .hasOwnProperty('constructor');
        })
      ;
    });

    it('hasNotOwnProperty(property [, value])', function(){
      test
        .value({foo: 'bar'})
          .hasNotOwnProperty('bar')

        .value({foo: 'bar'})
          .hasNotOwnProperty('foo', 'baz')

        .exception(function(){
          test.value({foo: 'bar'})
            .hasNotOwnProperty('foo');
        })
      ;
    });

    it('hasProperties(properties)', function(){

      var obj = {foo: 'bar', bar: 'huhu', other: 'vroom'};

      test
        .value(obj)
          .hasProperties(['other', 'bar', 'foo'])

        .exception(function(){
          test.value(obj)
            .hasProperties(['other', 'bar']);
        })
      ;
    });

    it('hasNotProperties(properties)', function(){

      var obj = {foo: 'bar', bar: 'huhu', other: 'vroom'};

      test
        .value(obj)
          .hasNotProperties(['other', 'foo'])

        .exception(function(){
          test.value(obj)
            .hasNotProperties(['other', 'bar', 'foo']);
        })
      ;
    });

    it('hasOwnProperties(properties)', function(){

      var obj = {foo: 'bar', bar: 'huhu', other: 'vroom'};

      test
        .value(obj)
          .hasOwnProperties(['other', 'bar', 'foo'])

        .exception(function(){
          test.value(obj)
            .hasOwnProperties(['other', 'bar']);
        })
      ;
    });

    it('hasKey(key [, value])', function(){
      test
        .value({foo: 'bar'})
          .hasKey('foo')

        .value({foo: 'bar'})
          .hasKey('foo', 'bar')

        .exception(function(){
          test.value({})
            .hasKey('foo');
        })
      ;
    });

    it('notHasKey(key [, value])', function(){
      test
        .value({foo: 'bar'})
          .notHasKey('bar')

        .value({foo: 'bar'})
          .notHasKey('foo', 'baz')

        .exception(function(){
          test.value({foo: 'bar'})
            .notHasKey('foo');
        })
      ;
    });

    it('hasKeys(keys)', function(){

      var obj = {foo: 'bar', bar: 'huhu', other: 'vroom'};

      test
        .value(obj)
          .hasKeys(['other', 'bar', 'foo'])

        .exception(function(){
          test.value(obj)
            .hasKeys(['other', 'bar']);
        })
      ;
    });

    it('notHasKeys(keys)', function(){

      var obj = {foo: 'bar', bar: 'huhu', other: 'vroom'};

      test
        .value(obj)
          .notHasKeys(['other', 'foo'])

        .exception(function(){
          test.value(obj)
            .notHasKeys(['other', 'bar', 'foo']);
        })
      ;
    });

    it('hasValue(expected)', function(){
      test
        .value('Hello, Nico!')
          .hasValue('Nico')

        .value([1, 42, 3])
          .hasValue(42)

        .value({life: 42, love: 69})
          .hasValue(42)

        .exception(function(){
          test.value({life: 42, love: 69})
            .hasValue(6);
        })
      ;
    });

    it('notHasValue(expected)', function(){
      test
        .value('Hello, Nico!')
          .notHasValue('Bye')

        .value([1, 42, 3])
          .notHasValue(4)

        .value({life: 42, love: 69})
          .notHasValue(4)

        .exception(function(){
          test.value({life: 42, love: 69})
            .notHasValue(69);
        })
      ;
    });

    it('hasValues(expected)', function(){
      test
        .value([1, 42, 3])
          .hasValues([42, 3])

        .exception(function(){
          test.value([1, 42, 3])
            .hasValues([42, 3.01]);
        })
      ;
    });

    it('notHasValues(expected)', function(){
      test
        .value([1, 42, 3])
          .notHasValues([4, 2])

        .exception(function(){
          test.value([1, 42, 3])
            .notHasValues([1, 42, 3]);
        })
      ;
    });

    it('contains(expected [, ...])', function(){
      test
        .value('hello boy')
          .contains('boy')

        .value('KISS principle : Keep it Simple, Stupid')
          .contains('Simple', 'principle', ':')

        .value([1,2,3])
          .contains([3])

        .value([1,2,3])
          .contains([1, 3])

        .value([1,2,3])
          .contains([3, 1, 2])

        .value({ a: { b: 10 }, b: { c: 10, d: 11, a: { b: 10, c: 11} }})
          .contains({ a: { b: 10 }, b: { c: 10, a: { c: 11 }}})

        .value([1, 2, 3, { a: { b: { d: 12 }}}])
          .contains([2], [1, 2], [{ a: { b: {d: 12}}}])

        .value([[1],[2],[3]])
          .contains([[3]])

        .value([[1],[2],[3, 4]])
          .contains([[3]])

        .value([{a: 'a'}, {b: 'b', c: 'c'}])
          .contains([{a: 'a'}], [{b: 'b'}])

        .exception(function(){
          test.value([{a: 'a'}, {b: 'b', c: 'c'}])
          .contains([{a: 'a'}], [{b: 'c'}]);
        })
      ;
    });

    it('notContains(expected [, ...])', function(){
      test
        .value('hello boy')
          .notContains('bye')

        .value([[1],[2],[3, 4]])
          .notContains([[0]])

        .value([{a: 'a'}, {b: 'b', c: 'c'}])
          .notContains([{a: 'b'}], [{c: 'b'}])

        .exception(function(){
          test.value([{a: 'a'}, {b: 'b', c: 'c'}])
            .notContains([{a: 'a'}, {c: 'c'}]);
        })
      ;
    });

    it('isReverseOf(expected)', function(){

      test
        .value([1, 2, 3])
          .isReverseOf([3, 2, 1])

        .exception(function() {
          test.value([1, 2, 3])
            .isReverseOf([1, 2, 3]);
        })

        .exception(function() {
          test.value([1, 2, 3])
            .isReverseOf([3, 2, 2, 1]);
        })
      ;
    });

    it('isNotReverseOf(expected)', function(){

      test
        .value([1, 2, 2, 3])
          .isNotReverseOf([3, 2, 1])

        .exception(function() {
          test.value([3, 2, 1])
            .isNotReverseOf([3, 2, 1]);
        })
      ;
    });

    it('startsWith(str)', function(){
      test
        .value('foobar')
          .startsWith('foo')

        .exception(function(){
          test.value('Hello the world').startsWith('world');
        })
      ;
    });

    it('notStartsWith(str)', function(){
      test
        .value('foobar')
          .notStartsWith('bar')

        .exception(function(){
          test.value('Hello the world').notStartsWith('Hello');
        })
      ;
    });

    it('endsWith(str)', function(){
      test
        .value('foobar')
          .endsWith('bar')

        .exception(function(){
          test.value('Hello the world').endsWith('Hello');
        })
      ;
    });

    it('notEndsWith(str)', function(){
      test
        .value('foobar')
          .notEndsWith('foo')

        .exception(function(){
          test.value('Hello the world').notEndsWith('world');
        })
      ;
    });


    it('hasHttpStatus(code)', function(){

      var req = {
        headers: {
          'content-type': 'application/json',
        },
        statusCode: 200
      };

      test
        .value(req)
          .hasHttpStatus(200)

        .value(req)
          .hasProperty('statusCode', 200)

        .exception(function(){
          test.value(req).hasHttpStatus(500);
        })
      ;
    });

    it('notHasHttpStatus(code)', function(){

      var req = {
        headers: {
          'content-type': 'application/json',
        },
        'statusCode': 200
      };

      test
        .value(req)
          .notHasHttpStatus(404)

        .value(req)
          .hasNotProperty('statusCode', 404)

        .exception(function(){
          test.value(req).notHasHttpStatus(200);
        })
      ;
    });

    it('hasHeader(field [, value])', function(){

      var req = {
        headers: {
          'content-type': 'application/json'
        }
      };

      test
        .exception(function(){
          test.value(req).hasHeader('charset');
        })

        .exception(function(){
          test.value(req).hasHeader('content-type', 'text/html');
        })

        .value(req)
          .hasHeader('content-type')
          .hasHeader('content-type', 'application/json')
      ;

      // or

      test
        .object(req.headers)
          .hasProperty('content-type')

        .string(req.headers['content-type'])
          .startsWith('application/json')
      ;

      // or

      test
        .string(req.headers['content-type'])
          .isNotEmpty()

        .string(req.headers['content-type'])
          .startsWith('application/json')
      ;
    });

    it('notHasHeader(field [, value])', function(){

      var req = {
        headers: {
          'content-type': 'application/json'
        }
      };

      test
        .exception(function(){
          test.value(req).notHasHeader('content-type');
        })

        .exception(function(){
          test.value(req).notHasHeader('content-type', 'application/json');
        })

        .value(req)
          .notHasHeader('charset')
          .notHasHeader('content-type', 'text/html')

        // other test cases

        .value({})
          .notHasHeader('charset')
          .notHasHeader('content-type', 'text/html')

        .value({headers: {}})
          .notHasHeader('charset')
          .notHasHeader('content-type', 'text/html')
      ;

    });

    it('hasHeaderJson()', function(){
      var req = {
        headers: {
          'content-type': 'application/json'
        }
      };

      test.value(req).hasHeaderJson();

      // or

      test
        .string(req.headers['content-type'])
          .startsWith('application/json')
      ;

      test
        .then(req.headers['content-type'] = 'application/json; charset=utf-8')

        .value(req).hasHeaderJson()
      ;

      // or

      test
        .string(req.headers['content-type'])
          .startsWith('application/json')
      ;

      test
        .then(req.headers['content-type'] = 'text/html')

        .error(function(){
          test.value(req).hasHeaderJson();
        })
      ;
    });

    it('notHasHeaderJson()', function(){

      var req = {
        headers: {
          'content-type': 'text/html'
        }
      };

      test
        .value(req)
          .notHasHeaderJson()

        .value({})
          .notHasHeaderJson()
      ;

      // or

      test
        .value(req)
          .notHasHeaderJson()

        .string(req.headers['content-type'])
          .notStartsWith('application/json')

        .value({})
          .notHasHeaderJson()

        .then(req.headers['content-type'] = 'application/json')

        .error(function(){
          test.value(req).notHasHeaderJson();
        })
      ;
    });

    it('hasHeaderHtml()', function(){

      var req = {
        headers: {
          'content-type': 'text/html'
        }
      };

      test.value(req).hasHeaderHtml();

      // or

      test.string(req.headers['content-type']).startsWith('text/html');

      test
        .then(req.headers['content-type'] = 'text/html; charset=utf-8')

        .value(req).hasHeaderHtml()
      ;

      // or

      test.string(req.headers['content-type']).startsWith('text/html');

      test
        .then(req.headers['content-type'] = 'application/json')

        .error(function(){
          test.value(req).hasHeaderHtml();
        })
      ;
    });

    it('notHasHeaderHtml()', function(){

      var req = {
        headers: {
          'content-type': 'application/json'
        }
      };

      test
        .value(req)
          .notHasHeaderHtml()

      // or
        .string(req.headers['content-type'])
          .notStartsWith('text/html')

        .then(req.headers['content-type'] = 'text/html')

        .error(function(){
          test.value(req).notHasHeaderHtml();
        })
      ;
    });

  });
});