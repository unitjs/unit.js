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

describe('Unit.js provides several API unified ' +
  'and several assertion styles', function() {

  it('Unit.js style', function() {

    // test 'string' type
    test.string('foobar')

      // then that actual value '==' expected value
      .isEqualTo('foobar')

      // then that actual value '===' expected value
      .isIdenticalTo('foobar')
    ;
  });

  it('Assert library of Node.js', function() {

    // test 'string' type
    test.assert(typeof 'foobar' == 'string');

    // then that actual value '==' expected value
    test.assert.equal('foobar', 'foobar');

    // then that actual value '===' expected value
    test.assert.strictEqual('foobar', 'foobar');

    // this shortcut works also like this
    var assert = test.assert;

    // test 'string' type
    assert(typeof 'foobar' == 'string');

    // then that actual value '==' expected value
    assert.equal('foobar', 'foobar');

    // then that actual value '===' expected value
    assert.strictEqual('foobar', 'foobar');
  });

  it('Should.js library', function() {

    // test 'string' type
    test.should('foobar').be.type('string');

    // then that actual value '==' expected value
    test.should('foobar' == 'foobar').be.ok;

    // then that actual value '===' expected value
    test.should('foobar').be.equal('foobar');

    // Should.js library (alternative style)
    var should = test.should;

    // test 'string' type
    ('foobar').should.be.type('string');

    // then that actual value '==' expected value
    ('foobar' == 'foobar').should.be.ok;

    // then that actual value '===' expected value
    ('foobar').should.be.equal('foobar');

    // this shortcut works also like this

    // test 'string' type
    should('foobar').be.type('string');

    // then that actual value '==' expected value
    should('foobar' == 'foobar').be.ok;

    // then that actual value '===' expected value
    should('foobar').be.equal('foobar');
  });

  it('Must.js library', function() {

    // test 'string' type
    test.must('foobar').be.a.string();

    // then that actual value '==' expected value
    test.must('foobar' == 'foobar').be.true();

    // then that actual value '===' expected value
    test.must('foobar').be.equal('foobar');

    // Must.js library (alternative style)
    var must = test.must;

    // test 'string' type
    ('foobar').must.be.a.string();

    // then that actual value '==' expected value
    ('foobar' == 'foobar').must.be.true();

    // then that actual value '===' expected value
    ('foobar').must.be.equal('foobar');

    // this shortcut works also like this

    // test 'string' type
    must('foobar').be.a.string();

    // then that actual value '==' expected value
    must('foobar' == 'foobar').be.true();

    // then that actual value '===' expected value
    must('foobar').be.equal('foobar');
  });

  it('Unit.js is expressive and fluent', function() {

    var
      obj = {
        fluent: 'is awesome'
      },
      copy_obj = obj,
      num,
      arr;

    test
      .object(obj)

        // ===
        // passes because is the same object
        .isIdenticalTo(copy_obj)

        // !==
        // passes because is not the same object
        .isNotIdenticalTo({
          fluent: 'is awesome'
        })

        // !=
        // passes because is not the same object
        .isNotEqualTo({
          fluent: 'is awesome'
        })

        // ==
        // passes because 'is' check that the objects are the same structure
        .is({
          fluent: 'is awesome'
        })

        .hasProperty('fluent', 'is awesome')

      .given(num = 10)

      .number(num)
        .isBetween(5, 15)

      .then()
        .error(function() {
          test.number(num / 1).isInfinite();
        })

      .if(num = num * 0.4)

      .number(num)

        // 10 * 0.4 = 4, ok 4 is approximately 5 (with a delta of 1.5)
        .isApprox(5, 1.5)

      .when(function() {

        arr = [];

        arr.push(num);
        arr.push('fluent');
      })

      .array(arr)
        .hasLength(2)
        .hasValue('fluent')

      .if(arr.push('test flow'))
      .and(arr.push('is expressive'))

      .array(arr)
        .hasLength(4)

        // provides expected via an array
        .hasValues(['fluent', 'test flow', 'is expressive'])
    ;
  });
});