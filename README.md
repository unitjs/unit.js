# Unit.js

[![Actual version published on NPM](https://badge.fury.io/js/unit.js.png)](https://www.npmjs.org/package/unit.js)
[![Dependencies](https://david-dm.org/unitjs/unit.js.png)](https://david-dm.org/unitjs/unit.js)
[![npm module downloads per month](http://img.shields.io/npm/dm/unit.js.svg)](https://www.npmjs.org/package/unit.js)

Unit testing framework for javascript / Node.js.

> Philosophy of Unit.js: modern, flexible, simple and intuitive.

_Unit.js_ is an _assertion library_ for Javascript, running on __Node.js__ and in the __browser__.
It __works with any test runner__ and unit testing framework like Mocha, Jasmine, Karma, protractor (E2E test framework for Angular apps), QUnit, ... and more.

_Unit.js_ provides an awesome API to write your unit tests in the way you prefer:

  * &#43; Unit.js (fluent style)
  * &#43; Assert (of Node.js)
  * &#43; Must.js
  * &#43; Should.js
  * &#43; Sinon.js
  * &#43; other friendly features.

 **=** [![Unit JS unit testing framework for javascript](http://unitjs.com/assets/img/unitjs.png)](http://unitjs.com)


Unit.js supports [dependency injection](http://unitjs.com/guide/dependency-injection.html) and is extensible via a [plugins system](http://unitjs.com/guide/plugins.html) easy to use.

The learning curve to be productive with Unit.js is very short. The list of assertions is fully documented in the _API doc_ and assertions are expressive like:

```js
test.string('hello');
test.object(user).hasProperty('email');
test.array(fruit).hasValue('kiwi');
test.assert(myVar === true);
test.bool(myVar).isTrue();
```

Unit.js was designed to provide the essential tools for writing unit tests with fun and qualities.

  * [Unit.js documentation](http://unitjs.com)
  * [Unit.js introduction](http://unitjs.com/guide/introduction.html)
  * [Quickstart](http://unitjs.com/guide/quickstart.html)
  * [Helpers](http://unitjs.com/guide/helpers.html)
  * Community support on the IRC channel __&#35;unit.js__ (freenode).

> Unit.js v1 is released!
> Look at the [changelog file](CHANGELOG.md) for see new features of this major release.


## Installation

### For Node.js

You can install Unit.js with NPM (Node Package Manager).

```shell
npm install unit.js
```

### For the browser

See [Unit.js in the browser](http://unitjs.com/guide/browser.html).


## Usage

See [quickstart](http://unitjs.com/guide/quickstart.html) in the guide.


### Example (proposal) of structured unit tests suite

```js
var test = require('unit.js');

describe('Learning by the example', function(){

  it('example variable', function(){

    // just for example of tested value
    var example = 'hello world';

    test
      .string(example)
        .startsWith('hello')
        .match(/[a-z]/)

      .given(example = 'you are welcome')
        .string(example)
          .endsWith('welcome')
          .contains('you')

      .when('"example" becomes an object', function(){

        example = {
          message : 'hello world',
          name    : 'Nico',
          job     : 'developper',
          from    : 'France'
        };
      })

      .then('test the "example" object', function(){

        test
          .object(example)
            .hasValue('developper')
            .hasProperty('name')
            .hasProperty('from', 'France')
            .contains({message: 'hello world'})
        ;
      })

      .if(example = 'bad value')
        .error(function(){
          example.badMethod();
        })
    ;

  });

  it('other test case', function(){
    // other tests ...
  });

});
```
Result :

![Result of unit tests with Unit.js](http://unitjs.com/assets/img/screen_console_unitjs_quickstart_example_result.png)


### Plugins

Unit.js provides a plugins system (based on [Noder.io](http://noder.io)) for extending Unit.js's assertions and interfaces.

It is possible to create a package works easily as a plugin for Unit.js and also as a standalone module or library.

Also, it's useful for bundled the code to re-use easily across multiple projects or for a large application with its specific modules (by writing plugins to facilitate the unit tests of each module).

If you wrote a plugin for Unit.js, please [let us know](https://github.com/unitjs/unit.js/issues/new?title=[new%20plugin]%20).

See [plugins](http://unitjs.com/guide/plugins.html) tutorial in the guide.


### Dependency injection (IOC)

Unit.js supports dependency injection (Inversion Of Control).

See [dependency-injection](http://unitjs.com/guide/dependency-injection.html) in the guide.


### Promise

Unit.js integrates [bluebird](https://github.com/petkaantonov/bluebird) for handling asynchronous unit tests.

Bluebird is a fully featured promise library with focus on innovative features and performance.

Example:

```js
var fs = test.promisifyAll(require('fs'));

it('async function', function(done) {

  test.promise
    .given(anyAsyncFunction())
    .then(function(contents) {
      test.string(contents)
        .contains('some value');
    })
    .catch(function(err){
      test.fail(err.message);
    })
    .finally(done)
    .done()
  ;
});

it('read file async', function(done) {

  fs.readFileAsync('./file.js', 'utf8')
    .then(function(contents){
      test.string(contents);
    })
    .catch(function(err){
      test.fail(err.message);
    })
    .finally(done)
    .done()
  ;
});
```

A light adjustment was added to write _promise_ with [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) style:

```js
test.promise
  .given(function() {
    // ...
  })
  .when(function() {
    // ...
  })
  .then(function() {
    // ...
  })
;
```


## Migrating to Unit.js

_Unit.js_ should work with any framework (and runner) of unit tests.
I tested _Unit.js_ with _Mocha_ and _Jasmine_, it works very well with these two runners.

For use _Unit.js_ in an existing tests suite, you can write your new tests with _Unit.js_ in your new files of unit tests.

For use _Unit.js_ in an existing file of unit tests, you just have to load it with `require('unit.js')` and use it like any assertion lib, example:

```js
var test = require('unit.js');

// your old tests with your old assertion lib
// and your new tests with Unit.js
```


## Fully documented

The API of Unit.js is fanatically documented with examples for all assertions.

  * API doc : the API of all asserters.
  * spec : the spec of all asserters.
  * guide : several tutorials to learn the unit testing with Unit.js.
  * [Unit.js Introduction](http://unitjs.com/guide/introduction.html)
  * [Unit.js Quickstart](http://unitjs.com/guide/quickstart.html)


## Learning

Takes a little time to learn (see [UnitJS.com](http://unitjs.com)) with the tutorials in the _guide_, the _API doc_ and looking at the many examples of codes in the _spec doc_ and unit tests examples.

You are operational and productive from the outset. The style of writing your unit tests is not imposed, it depends on your preferences. Unit.js is flexible enough to fit your coding style without effort on your part.

The mastery of Unit.js is very fast, especially if you already know one of the libraries of assertions ([Assert of Node.js](http://unitjs.com/guide/assert-node-js.html), [Shoud.js](http://unitjs.com/guide/should-js.html), [Must.js](http://unitjs.com/guide/must-js.html), [Sinon.js](http://unitjs.com/guide/sinon-js.html), [Atoum](http://docs.atoum.org/en/chapter2.html#Writing-tests)).


## Related

Useful _snippets_ for code editor:
  * [Unit.js package for Atom.io editor](https://github.com/unitjs/atom-unitjs)
  * [Unit.js package for Sublime Text editor](https://github.com/unitjs/sublime-unitjs)


## License

Unit.js is released under a *Lesser GNU Affero General Public License*, which in
summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this
  program.

For more convoluted language, see the [LICENSE](http://unitjs.com/license.html).


## Author

Unit.js is designed and built with love by

| [![Nicolas Tallefourtane - Nicolab.net](http://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](http://nicolab.net) |
|---|
| [Nicolas Talle](http://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |
