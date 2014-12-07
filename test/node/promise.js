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
var Promise = require('bluebird');

describe('Control flow (async)', function() {

  it('Based on bluebird', function() {
    test
      .function(test.promise)
        .hasName('Promise')
        .isIdenticalTo(Promise)
        .isIdenticalTo(require('bluebird'))
    ;
  });

  it('supports: given, when, then', function(done) {

    var fs = test.promisifyAll(require('fs'));

    test.promise
      .given(function() {
        return fs.readFileAsync(__filename);
      })

      .when(function(raw) {
        test
          .string(raw.toString())
            .isNotEmpty()
            .contains('I m here !!!')
        ;

        return raw.toString();
      })
      .then(function(contents) {
        test
          .string(contents)
            .isNotEmpty()
            .contains('I m here also !!!')
        ;
      })
      .catch(function(err){
        test.fail('test.promise, ' + err.message);
      })
      .finally(done)
      .done()
    ;
  });

  it('test.promisifyAll()', function(done) {

    var fs = test.promisifyAll(require('fs'));

    // just for test, otherwise for get string directly
    // use fs.readFileAsync(__filename, 'utf8')
    fs.readFileAsync(__filename)
      .when(function(raw) {
        test
          .string(raw.toString())
            .isNotEmpty()
            .contains('I m here !!!')
        ;

        return raw.toString();
      })
      .then(function(contents) {
        test
          .string(contents)
            .isNotEmpty()
            .contains('I m here also !!!')
        ;
      })
      .catch(function(err){
        test.fail('test.promise, ' + err.message);
      })
      .finally(done)
      .done()
    ;
  });

  it('test.promisify()', function(done) {

    var readFile = Promise.promisify(require('fs').readFile);

    readFile(__filename, 'utf8')
      .then(function(contents) {
        test
          .string(contents)
            .isNotEmpty()
            .contains('I m here !!!')
        ;
      })
      .catch(function(err){
        test.fail('test.promise, ' + err.message);
      })
      .finally(done)
      .done()
    ;
  });

  it('test.promise.given', function(done) {

    var fs = test.promisifyAll(require('fs'));

    test.promise
      .given({
        a:'a value',
        b: 2,
        contents: fs.readFileAsync(__filename, 'utf8')
      })
      .when(function(given) {

        test
          .string(given.a)
            .isIdenticalTo('a value')

          .number(given.b)
            .isIdenticalTo(2)

          .bool(test.promise.is(given.contents))
            .isFalse()

          .string(given.contents)
            .isNotEmpty()
            .contains('I m here !!!')
        ;

        return given.contents;
      })
      .then(function(contents) {

        test
          .bool(test.promise.is(contents))
            .isFalse()

          .string(contents)
            .isNotEmpty()
            .contains('I m here also !!!')
        ;
      })
      .catch(function(err){
        test.fail('test.promise, ' + err.message);
      })
      .done()
    ;

    test.promise
      .given(function() {
        return 123;
      })
      .then(function(num) {
        test.number(num).isIdenticalTo(123);
      })
      .catch(function(err){
        test.fail('test.promise, ' + err.message);
      })
      .done()
    ;

    test.promise
      .given(fs.readFileAsync(__filename, 'utf8'))
      .then(function(contents) {
        test.string(contents).contains('I m here !!!');
      })
      .catch(function(err){
        test.fail('test.promise, ' + err.message);
      })
      .done()
    ;

    test.promise
      .given(function() {
        return fs.readFileAsync(__filename, 'utf8');
      })
      .then(function(contents) {
        test.string(contents).contains('I m here !!!');
      })
      .catch(function(err){
        test.fail('test.promise, ' + err.message);
      })
      .finally(done)
      .done()
    ;
  });

  it('test.promise.is', function() {
    var assert = test.assert;
    var is     = test.promise.is;
    var fs     = test.promise.promisifyAll(require('fs'));

    assert(!is({}));
    assert(!is([]));
    assert(!is(null));
    assert(!is(0));
    assert(!is(1));
    assert(!is('a'));
    assert(!is(function() {}));

    assert(is(fs.readFileAsync(__filename, 'utf8')));
    assert(is(test.promise.given([1, 2, 3])));
    assert(is(test.promise.given({a: 1, b: 2})));
    assert(is(test.promise.given(function() {})));
  });

  it('Async example', function() {

    var fs = test.promisifyAll(require('fs'));

    fs.readFileAsync(require('path').resolve() + '/package.json')
      .when(JSON.parse)
      .then(function(pkg) {
        test
          .object(pkg)
            .hasKey('name', 'unit.js')
            .hasKey('version')

          .value(pkg.version)
            .isGreaterThan('1')
        ;
      })
      .catch(SyntaxError, function(err) {
        test.fail('Syntax error');
      })
      .catch(function(err){
        test.fail(err.message);
      })
      .done()
    ;
  });

});