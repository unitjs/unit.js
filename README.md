# Unit.js
[![Actual version published in NPM](http://img.shields.io/npm/v/unit.js.svg)](https://www.npmjs.org/package/unit.js) 

Simple, intuitive and flexible unit testing framework for javascript.

  * &#43; Must.js 
  * &#43; Should.js 
  * &#43; Assert of Node.js
  * &#43; Sinon.js
  * &#43; fluent style like [Atoum](https://github.com/atoum/atoum)
  * &#43; other friendly features.

 **=** [![Unit JS unit testing framework for javascript](http://unitjs.com/assets/img/unitjs.png)](http://unitjs.com)

Unit.js is test runner and framework agnostic, by default Unit.js run with [Mocha](http://unitjs.com/doc-mocha.html) but works with any other runner. Unit.js can be used as an assertion library or as a full stack unit testing framework with [Mocha](http://unitjs.com/doc-mocha.html).

  * [Unit.js introduction](http://unitjs.com/doc-introduction.html)
  * [Getting started](http://unitjs.com/doc-quickstart.html)
  * [Unit.js documentation](http://unitjs.com)
  * Community support on the IRC channel __&#35;unit.js__ (freenode).

## Several styles

### Basic

```js
var obj = {message: 'hello', name: 'Nico'};

var str = 'Hello world';

// Structure of a request object.
// By example, provided by Express framework and other modules.
var req = {
  headers: {
    'content-type': 'application/json'
  }
};

test.object(obj).hasProperty('name');
test.object(obj).hasProperty('message', 'hello');

test.string(str).startsWith('Hello');
test.string(str).contains('world');
test.string(str).match(/[a-zA-Z]/);

test.value(req).hasHeader('content-type');

test.value(req).hasHeader('content-type', 'application/json');
// or
test.value(req).hasHeaderJson();
```

### Fluent

```js
var obj = {message: 'hello', name: 'Nico'};

var str = 'Hello world';

// Structure of a request object.
// By example, provided by Express framework and other modules.
var req = {
  headers: {
    'content-type': 'application/json'
  }
};

test
  .object(obj)
    .hasProperty('name')
    .hasProperty('message', 'hello')

  .string(str)
    .startsWith('Hello')
    .contains('world')
    .match(/[a-zA-Z]/)

  .value(req)
    .hasHeader('content-type')
    .hasHeader('content-type', 'application/json')
    // or
    .hasHeaderJson()
;
```

### Expressive

```js
var obj = {message: 'hello', name: 'Nico'};

var trigger = function(){
  throw new Error('Whoops !');
};

test
  .object(obj)
    .hasProperty('name')
    .hasProperty('message', 'hello')

  .when('Add "job" property', obj.job = 'developper')

  .then(function(){
    test.object(obj).hasProperty('job', 'developper');
  })

  .case('Delete all properties', function() {

    test
      .when(function() {
        delete obj.name;
        delete obj.message;
        delete obj.job;
      })

      .then(function(){
        test.object(obj).isEmpty();
      })
    ;
  })

  .if(obj.message = 'Hello world !')
  .and(obj.name = 'say hello')

  .string(obj.message)
    .startsWith('Hello')
    .endsWith('world !')
    .notContains('foobar')

  .given(obj = new Date(2014, 02))

  .date(obj)
    .isBefore(new Date(2020, 12))
    .isAfter(new Date(2010, 01))
    .isBetween(new Date(2014, 01), new Date(2014, 12))

  .then('Test the exception')

  .exception(trigger)
    .hasMessage('Whoops !')
    .hasMessage(/whoops/i)
    .isInstanceOf(Error)

  // or
  .error(trigger)
    .hasMessage('Whoops !')
    .hasMessage(/whoops/i)
;
```

### Integrates the great assertions libraries

#### Assert

```js
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
```
See the [assert tutorial](http://unitjs.com/doc-assert-node-js.html).

#### Must.js

```js
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

```

See the [Must.js tutorial](http://unitjs.com/doc-must-js.html).

#### Should.js

```js
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
```

See the [Should.js tutorial](http://unitjs.com/doc-should-js.html).

#### httpAgent

Testing _Node.js_ HTTP servers (response and request) with the _httpAgent_.

_httpAgent_ uses the modules _supertest_ and _superagent_.

```js
var 
  test = require('unit.js'),
  express = require('express')
;

var app = express();

app.get('/user', function(req, res){
  res.send(200, { name: 'tobi' });
});

test.httpAgent(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });
```

Anything you can do with _supertest_ and _superagent_, you can do with _httpAgent_ - for example multipart file uploads!

```js
test.httpAgent(app)
  .post('/user')
  .attach('avatar', 'test/fixtures/homeboy.jpg')
  // ...
```

See also the [HTTP agent tutorial](http://unitjs.com/doc-http-agent.html).

#### Sinon.js

Mock :

```js
function once(fn) {
  var 
    returnValue, 
    called = false
  ;

  return function () {
    if (!called) {
      called = true;
      returnValue = fn.apply(this, arguments);
    }
    return returnValue;
  };
};

var myAPI = { method: function () {} };
var mock = test.mock(myAPI);

mock
  .expects('method')
  .once()
  .returns(42)
;

var proxy = once(myAPI.method);

test.number(proxy()).is(42);

mock.verify();
```

Sandbox :

```js
it('test using sandbox', test.sinon.test(function () {

  var myAPI = { 
    method: function () {} 
  };

  var mockMyApi = this.mock(myAPI).expects('method').once().returns(42);

  var proxy = once(myAPI.method);

  test.number(proxy()).isIdenticalTo(42);

  mockMyApi.verify();
}));
```

See the [Sinon.js tutorial](http://unitjs.com/doc-sinon-js.html).

## Installation

Unit.js is a Node.js module. You can install it with NPM (Node Package Manager).

```shell
npm install unit.js
```

### Usage 

create `test` directory
create a file named `example.js` in the `test` directory.

`path/your/project/test/example.js`

Write this below code in the `example.js` file :

```js
// load Unit.js module
var test = require('unit.js');

// just for example of tested value
var example = 'hello';

// assert that example variable is a string
test.string(example);

// or with Must.js
test.must(example).be.a.string();

// or with assert
test.assert(typeof example === 'string');
```

Run the tests with Mocha (or other runner)

```shell
node_modules/unit.js/bin/test test/example.js
```

`example.js` is tested :)

OR alias

```shell
node_modules/.bin/test test/example.js
```

Display the _spec_ report with `-R spec`

```shell
node_modules/.bin/test test/example.js -R spec
```

You can launch the tests for all files in the `test` directory

```shell
node_modules/.bin/test test -R spec --recursive
```

> See also the [Mocha tutorial](http://unitjs.com/doc-mocha.html).


#### Example (proposal) of structured unit tests suite

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
          message: 'hello world', 
          name: 'Nico', 
          job: 'developper',
          from: 'France'
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


## Fully documented

The API of Unit.js is fanatically documented with examples for all assertions.

- API doc : the API of all asserters.
- spec : the spec of all asserters.
- guide : several tutorials to learn the unit testing with Unit.js.
- [Unit.js Quickstart](http://unitjs.com/doc-quickstart.html)


## License

Unit.js is released under a *Lesser GNU Affero General Public License*, which in
summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this
  program.

For more convoluted language, see the [LICENSE](http://unitjs.com/license.html).


## Related

- [Unit.js package for Sublime Text editor](https://github.com/unitjs/sublime-unitjs)


## Author

Unit.js is designed and built with love by

| [![Nicolas Tallefourtane - Nicolab.net](http://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](http://nicolab.net) |
|---|
| [Nicolas Talle](http://nicolab.net) |
| [![Support via Gittip](http://img.shields.io/gittip/Nicolab.svg)](https://www.gittip.com/Nicolab/) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |