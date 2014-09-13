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

describe('Asserter array()', function(){

  describe('array() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){
        test
          .value(test.array([]).hasHeader)
            .isUndefined()

          .value(test.array([]).isError)
            .isUndefined()

          .value(test.array([]).hasMessage)
            .isUndefined()

          .value(test.array([]).isInfinite)
            .isUndefined()
        ;
    });

    it('Assert that the tested value is an `array`', function(){

        var Foo = function Foo(){};

        test
          .array([])
          .array(['a', 'b', 'c'])
          .array(new Array())

          .case('Test failure', function(){

            test
              .exception(function(){
                test.array({});
              })

              .exception(function(){
                test.array('Foo');
              })

              .exception(function(){
                test.array(Foo);
              })

              .exception(function(){
                test.array(1);
              })

              .exception(function(){
                test.array(undefined);
              })

              .exception(function(){
                test.array(true);
              })

              .exception(function(){
                test.array(false);
              })

              .exception(function(){
                test.array(null);
              })

              .exception(function(){
                test.array(function(){});
              })
            ;
          })
        ;
    });

  });

  describe('Assertions of array()', function(){

    it('is(expected)', function(){

      test
        .array(['foo', [0, 1]])
          .is(['foo', [0, 1]])

        .case('Test failure', function(){

          test
            .exception(function(){
              test.array(['foo', [0, 1]])
                .is(['foo', [0, '1']]);
            })

            .exception(function(){
              test.array(['foo', [0, 1]])
                .is(['foo', [0, 1, 2]]);
            })

            .exception(function(){
              test.array(['foo', [0, 1]])
                .is(['foo', [0]]);
            })

            .exception(function(){
              test.array(['foo', [0, 1]])
                .is(['foobar', [0, 1]]);
            })
          ;
        })
      ;

    });

    it('isNot(expected)', function(){

      test
        .array(['foo', [0, 1]])
          .isNot(['foo', [0, '1']])

        .exception(function(){
          test.array(['foo', [0, 1]])
            .isNot(['foo', [0, 1]]);
        })
      ;

    });

    it('isIdenticalTo(expected)', function(){

      var
        arr = [1],
        arr2 = arr
      ;

      test
        .array(arr)
          .isIdenticalTo(arr2)

        .exception(function(){
          test.array(arr)
            .isIdenticalTo([1]);
        })
      ;

    });

    it('isNotIdenticalTo(expected)', function(){

      var
        arr = [1],
        arr2 = arr
      ;

      test
        .array(arr)
          .isNotIdenticalTo([1])

        .exception(function(){
          test.array(arr)
            .isNotIdenticalTo(arr2);
        })
      ;

    });

    it('isEqualTo(expected)', function() {

      var
        arr = [1],
        arr2 = arr
      ;

      test
        .array(arr)
          .isEqualTo(arr2)

        .exception(function(){
          test.array(arr)
            .isEqualTo([1]);
        })
      ;

    });

    it('isNotEqualTo(expected)', function() {

      var
        arr = [1],
        arr2 = arr
      ;

      test
        .array(arr)
          .isNotEqualTo([1])

        .exception(function(){
          test.array(arr)
            .isNotEqualTo(arr2);
        })
      ;

    });

    it('match(expected)', function() {

      test
        .array(['a', 'b', 'c'])
          .match(/[a-z]/)

        .array([42, 10])
          .match(function(actual) {
            return actual[1] === 10;
          })

        .exception(function() {

          test.array([42, '10']).match(function(actual) {
            return actual[1] === 10;
          });

        })
      ;

    });

    it('notMatch(expected)', function() {

      test
        .array(['a', 'b', 'c'])
          .notMatch(/[d-z]/)

        .array([42, 10])
          .notMatch(function(actual) {
            return actual[1] === '10';
        })

        .exception(function() {

          test.array([42, '10']).notMatch(function(actual) {
            return actual[0] === 42;
          });

        })
      ;

    });

    it('isValid(expected)', function(){

      test
        .array(['a', 'b', 'c'])
          .isValid(/[a-z]/)

        .array([42, 10])
          .isValid(function(actual) {
            return actual[1] === 10;
          })

        .exception(function() {

          test.array([42, '10']).isValid(function(actual) {
            return actual[1] === 10;
          });

        })
      ;

    });

    it('isNotValid(expected)', function(){

      test
        .array(['a', 'b', 'c'])
          .isNotValid(/[d-z]/)

        .array([42, 10])
          .isNotValid(function(actual) {
            return actual[1] === '10';
        })

        .exception(function() {

          test.array([42, '10']).isNotValid(function(actual) {
            return actual[0] === 42;
          });

        })
      ;

    });

    it('matchEach(expected)', function(){

      test
        .array([10, 11, 12])
          .matchEach(function(it) {
            return it >= 10;
          })

        .exception(function() {

          // error if one or several does not match
          test.array([10, 11, 12]).matchEach(function(it) {
            return it >= 11;
          });

        })
      ;

    });

    it('notMatchEach(expected)', function(){

      test
        .array([10, 11, 12])
          .notMatchEach(function(it) {
            return it >= 13;
          })

        .exception(function() {

          // error all match
          test.array([10, 11, 12]).notMatchEach(function(it) {
            return it >= 11;
          });

        })
      ;

    });

    it('isEmpty()', function(){

      test
        .array([])
          .isEmpty()

        .exception(function(){
          test.array([0])
            .isEmpty();
        })

        .exception(function(){
          test.array([''])
            .isEmpty();
        })
      ;

    });

    it('isNotEmpty()', function(){

      test
        .array(['a'])
          .isNotEmpty()

        .exception(function(){
          test.array([])
            .isNotEmpty();
        })
      ;

    });

    it('hasLength(expected)', function(){
      test
        .array([1, 2])
          .hasLength(2)

        .exception(function(){
          test.array([1, 2])
            .hasLength(1);
        })
      ;
    });

    it('hasNotLength(expected)', function(){
      test
        .array([1, 2])
          .hasNotLength(1)

        .exception(function(){
          test.array([1, 2])
            .hasNotLength(2);
        })
      ;
    });

    it('isEnumerable(property)', function(){
      var arr = ['is enumerable'];

      test
        .array(arr)
          .isEnumerable(0)

        .array(arr)
          .isNotEnumerable('length')

        .exception(function(){
          test.array(arr)
            .isEnumerable('length');
        })
      ;
    });

    it('isNotEnumerable(property)', function(){
      var arr = ['is enumerable'];

      test
        .array(arr)
          .isNotEnumerable('length')

        .array(arr)
          .isEnumerable(0)

        .exception(function(){
          test.array(arr)
            .isNotEnumerable(0);
        })
      ;
    });

    it('hasProperty(property [, value])', function(){
      test
        .array(['a', 'b'])
          .hasProperty(1)
          .hasProperty(0, 'a')

        .exception(function(){
          test.array(['a', 'b'])
            .hasProperty(3);
        })

        .exception(function(){
          test.array(['a', 'b'])
            .hasProperty(0, 'b');
        })
      ;
    });

    it('hasNotProperty(property [, value])', function(){
      test
        .array(['a', 'b'])
          .hasNotProperty(2)
          .hasNotProperty(0, 'b')

        .exception(function(){
          test.array(['a', 'b'])
            .hasNotProperty(0);
        })

        .exception(function(){
          test.array(['a', 'b'])
            .hasNotProperty(1, 'b');
        })
      ;
    });

    it('hasKey(key [, value])', function(){
      test
        .array(['a', 'b'])
          .hasKey(1)
          .hasKey(0, 'a')

        .exception(function(){
          test.array(['a', 'b'])
            .hasKey(3);
        })

        .exception(function(){
          test.array(['a', 'b'])
            .hasKey(0, 'b');
        })
      ;
    });

    it('notHasKey(key [, value])', function(){
      test
        .array(['a', 'b'])
          .notHasKey(2)
          .notHasKey(0, 'b')

        .exception(function(){
          test.array(['a', 'b'])
            .notHasKey(0);
        })

        .exception(function(){
          test.array(['a', 'b'])
            .notHasKey(1, 'b');
        })
      ;
    });

    it('hasValue(expected)', function(){
      test
        .array([1, 42, 3])
          .hasValue(42)

        .exception(function(){
          test.array([1, 42, 3])
            .hasValue(0);
        })
      ;
    });

    it('notHasValue(expected)', function(){
      test
        .array([1, 42, 3])
          .notHasValue(4)

        .exception(function(){
          test.array([1, 42, 3])
            .notHasValue(42);
        })
      ;
    });

    it('hasValues(expected)', function(){
      test
        .array([1, 42, 3])
          .hasValues([42, 3])

        .exception(function(){
          test.array([1, 42, 3])
            .hasValues([42, 3, 10]);
        })
      ;
    });

    it('notHasValues(expected)', function(){
      test
        .array([1, 42, 3])
          .notHasValues([4, 2])

        .exception(function(){
          test.array([1, 42, 3])
            .notHasValues([4, 1]);
        })
      ;
    });

    it('contains(expected [, ...])', function(){
      test
        .array([1,2,3])
          .contains([3])

        .array([1,2,3])
          .contains([1, 3])

        .array([1,2,3])
          .contains([3], [1, 3])

        .array([1, 2, 3, { a: { b: { d: 12 }}}])
          .contains([2], [1, 2], [{ a: { b: {d: 12}}}])

        .array([[1],[2],[3]])
          .contains([[3]])

        .array([[1],[2],[3, 4]])
          .contains([[3]])

        .array([{a: 'a'}, {b: 'b', c: 'c'}])
          .contains([{a: 'a'}], [{b: 'b'}])

        .exception(function(){
          test.array([1,2,3])
            .contains([0]);
        })
      ;
    });

    it('notContains(expected [, ...])', function(){
      test
        .array([[1],[2],[3, 4]])
          .notContains([[0]])

        .array([{a: 'a'}, {b: 'b', c: 'c'}])
          .notContains([{a: 'b'}], [{c: 'b'}])

        .exception(function(){
          test.array([{a: 'a'}, {b: 'b', c: 'c'}])
          .notContains([{a: 'a'}], [{b: 'b'}]);
        })
      ;
    });

    it('isReverseOf(expected)', function(){

      test
        .array([1, 2, 3])
          .isReverseOf([3, 2, 1])

        .exception(function() {
          test.array([1, 2, 3])
            .isReverseOf([1, 2, 3]);
        })

        .exception(function() {
          test.array([1, 2, 3])
            .isReverseOf([3, 2, 2, 1]);
        })
      ;
    });

    it('isNotReverseOf(expected)', function(){

      test
        .array([1, 2, 2, 3])
          .isNotReverseOf([3, 2, 1])

        .exception(function() {
          test.array([3, 2, 1])
            .isNotReverseOf([3, 2, 1]);
        })
      ;
    });

  });
});