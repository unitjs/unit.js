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

function once(fn) {
  var returnValue;
  var called = false;

  return function() {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
}

var jQuery = {
  ajax: function() {}
};

function getTodos(listId, callback) {
  jQuery.ajax({
    url: '/todo/' + listId + '/items',
    success: function(data) {

      // Node-style CPS: callback(err, data)
      callback(null, data);
    }
  });
}

describe('Unit.js provides sinon.js', function() {

  describe('Spies', function() {


    it('calls the original function', function() {
      var callback = test.spy();
      var proxy = once(callback);

      proxy();

      test.assert(callback.called);
    });

    it('calls the original function only once', function() {
      var callback = test.spy();
      var proxy = once(callback);

      proxy();
      proxy();

      test.assert(callback.calledOnce);

      // ...or:
      test.assert.strictEqual(callback.callCount, 1);
    });

    it('calls original function with right this and args', function() {
      var callback = test.spy();
      var proxy = once(callback);
      var obj = {};

      proxy.call(obj, 1, 2, 3);

      test.assert(callback.calledOn(obj));
      test.assert(callback.calledWith(1, 2, 3));
    });
  });

  describe('Stubs', function() {

    it('returns the return value from the original function', function() {
      var callback = test.stub().returns(42);
      var proxy = once(callback);

      test.assert.strictEqual(proxy(), 42);
    });
  });

  describe('Testing Ajax', function() {

    after(function() {
      // When the test either fails or passes, restore the original
      // jQuery ajax function (Sinon.JS also provides tools to help
      // test frameworks automate clean-up like this)
      jQuery.ajax.restore();
    });

    it('makes a GET request for todo items', function() {
      test.stub(jQuery, 'ajax');

      getTodos(42, test.spy());

      test.assert(jQuery.ajax.calledWithMatch({
        url: '/todo/42/items'
      }));
    });

  });

  describe('Mocks', function() {
    it('returns the return value from the original function', function() {
      var myAPI = {
        method: function() {}
      };

      var mock = test.mock(myAPI);

      mock.expects('method').once().returns(42);

      var proxy = once(myAPI.method);

      test.assert.equal(proxy(), 42);

      mock.verify();
    });

    it('test should call a method with exceptions', function() {
      var myAPI = {
        method: function() {}
      };

      var mock = test.mock(myAPI);

      mock.expects('method').once().throws();

      test.exception(function() {
        myAPI.method();
      })
        .isInstanceOf(Error);

      mock.verify();
    });
  });

  describe('Matchers', function() {
    it('test should assert fuzzy', function() {

      var book = {
        pages: 42,
        author: 'cjno'
      };

      var spy = test.spy();

      spy(book);

      test.sinon.assert.calledWith(spy, test.sinon.match({
        author: 'cjno'
      }));

      test.sinon.assert.calledWith(spy, test.sinon.match.has('pages', 42));
    });

    it('test should stub method differently based on argument types',
      function() {
        var callback = test.stub();

        callback.withArgs(test.sinon.match.string).returns(true);
        callback.withArgs(test.sinon.match.number).throws('TypeError');

        test.bool(callback('abc')).isTrue(); // Returns true

        test.exception(function() {
          callback(123); // Throws TypeError
        })
          .isValid(function(err) {

            if (err.name === 'TypeError') {
              return true;
            }
          });
      });

    it('Combining matchers', function() {

      var stringOrNumber = test.sinon.match.string
        .or(test.sinon.match.number);

      var bookWithPages = test.sinon.match.object
        .and(test.sinon.match.has('pages'));

      var book = {
        pages: 42,
        author: 'cjno'
      };

      var spy = test.spy();
      var otherSpy = test.spy();

      spy(book);
      otherSpy(10);

      test.sinon.assert.calledWith(spy, bookWithPages);
      test.sinon.assert.calledWith(otherSpy, stringOrNumber);
    });

    it('Custom matchers', function() {

      var equal10 = test.sinon.match(function(value) {
        return value === 10;
      }, 'value is not equal to 10');

      var spy = test.spy();
      var otherSpy = test.spy();

      spy(10);
      otherSpy(42);

      // ok because the argument value 10 is identical to 10 expected
      test.sinon.assert.calledWith(spy, equal10);

      test.exception(function() {

        // throws an exception because the argument value 42
        // is not identical to 10 expected
        test.sinon.assert.calledWith(otherSpy, equal10);
      })
        .hasMessage(/value is not equal to 10/);

    });
  });

  describe('Sandbox', function() {
    it('test using test.sinon.test sandbox', test.sinon.test(function() {

      var myAPI = {
        method: function() {}
      };

      var mockMyApi = this.mock(myAPI).expects('method').once().returns(
        42);

      var proxy = once(myAPI.method);

      test.number(proxy()).isIdenticalTo(42);

      mockMyApi.verify();
    }));
  });
});