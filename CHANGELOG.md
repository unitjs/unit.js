# Changelog

## 2.0.0 - 2015-04-19

### Update Should.js _v5.*_ to _v.6*_.

Note: The _should.js@v6_ change the behavior of `should.containDeep*`, `should.containDeep*` does not check substrings anymore.
See [should.js#42](https://github.com/shouldjs/should.js/issues/42)

### .contains()

[.contains()](http://unitjs.com/api/value.html#contains) and [.notContains()](http://unitjs.com/api/value.html#notContains) takes several arguments (instead of an array of arguments). This new behavior is more natural and avoids the ambiguity for test an array or object.


## 1.2.0 - 2015-04-18

New method of assertion:

 * [test.number(actual).isNaN()](http://unitjs.com/api/number.html#isNaN)
 * [test.number(actual).isNotNaN()](http://unitjs.com/api/number.html#isNotNaN)
 * [test.value(parseInt('not a number', 10)).isNaN()](http://unitjs.com/api/value.html#isNaN)
 * [test.value(undefined).isNotNaN()](http://unitjs.com/api/value.html#isNotNaN)

## 1.0.0 - 2014-09-12

  * Lots of sub-dependencies are removed.
  * No break in the API.
  * New features.
  * Fanatically tested and documented.


### Works in the browser

Now we can use Unit.js in the browser :fist:

So we can write unit tests with Unit.js for Web applications based on Vanilla JS, jQuery, AngularJS, Backbone.js, ReactJS ... all!

With any runner like Mocha, Jasmine, Protractor (end-to-end test framework for AngularJS applications), QUnit, ... what you want :)

See [Unit.js in the browser](http://unitjs.com/guide/browser.html).


### _Mocha_ is no longer included by default.

To use Unit.js with _Mocha_ simply install `npm install -g mocha`
and uses the command `mocha <path/of/your/test/directory>`

Or `npm install mocha --save-dev` and add in your `package.json`:

```json
"scripts": {
  "test": "mocha test"
}
```
Then uses this command `npm test`.

See [Mocha tutorial](http://unitjs.com/guide/mocha.html) in the guide.


### New asserters:

  * [isReverseOf()](http://unitjs.com/api/value.html#isReverseOf)
  * [isNotReverseOf()](http://unitjs.com/api/value.html#isNotReverseOf)
  * isStrictEqualTo() alias of isIdenticalTo() (`===`)
  * isNotStrictEqualTo() alias of isNotIdenticalTo() (`!==`)


### New helpers

  * test.promise
  * test.promisify()
  * test.promisifyAll()
  * test.fail()
  * test.stats

See [helpers](http://unitjs.com/guide/helpers.html) in the guide.


#### Promise

To keep execution flow organized, Unit.js integrates a mechanism of _promise_ based on the excellent [bluebird](https://github.com/petkaantonov/bluebird).

Bluebird is a fully featured promised library with focus on innovative features and performance.

Example:

```js
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
```

`Given, when, then` are integrated on top of _bluebird_:

```js
test.promise
  .given($.get('http://www.google.com'))
  .when(function(google) {
    // some states
    // contents = ...
    return $.post('http://localhost/api');
  })
  .then(function(apiPost){
    //some tests
  })
  .catch(function(error) {
    // error handler (you can use test.fail() helper)
  })
  .done()
;
```

Useful for managing easily the control flow of asynchronous tests.

See [promise](http://unitjs.com/guide/promise.html) in the guide.


### Dependency injection (DI)

Unit.js supports _Dependency Injection_ (Inversion Of Control).

See [dependency-injection](http://unitjs.com/guide/dependency-injection.html) in the guide.


### Plugins system

Unit.js provides a plugins system (based on [Noder.io](http://noder.io)) for extending Unit.js's assertions and interfaces.

It is possible to create a package works easily as a plugin for Unit.js and also as a standalone module or library.

If you wrote a plugin for Unit.js, please [let us know](https://github.com/unitjs/unit.js/issues/new?title=[new%20plugin]%20).

See [plugins](http://unitjs.com/guide/plugins.html) tutorial in the guide.


### Documentation

[Documentation](http://unitjs.com) has been improved.
