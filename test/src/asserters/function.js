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

describe('Asserter function()', function(){

  describe('function() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

        var fn = function(){};

        test
          .value(test.function(fn).hasHeader)
            .isUndefined()

          .value(test.function(fn).isAfter)
            .isUndefined()

          .value(test.function(fn).hasMessage)
            .isUndefined()
        ;

    });

    it('Assert that the tested value is a `function`', function(){

      var fn = function(){};

      test
        .function(fn)
        .function(Date)

        .case('Test failure', function(){

          test
            .exception(function(){
              test.function(fn());
            })

            .exception(function(){
              test.function({});
            })

            .exception(function(){
              test.function([]);
            })

            .exception(function(){
              test.function(new Date());
            })

            .exception(function(){
              test.function('foobar');
            })

            .exception(function(){
              test.function(1);
            })

            .exception(function(){
              test.function(true);
            })

            .exception(function(){
              test.function(false);
            })

            .exception(function(){
              test.function(null);
            })

            .exception(function(){
              test.function(undefined);
            })

            .exception(function(){
              test.function();
            })
          ;
        })
      ;

    });

  });

  describe('Assertions of function()', function(){

    it('is(expected)', function(){

      var fn = function(){};
      var ref = fn;

      test
        .function(ref)
          .is(fn)

        .exception(function(){
          test.function(fn).is(function(){});
        })
      ;

    });

    it('isNot(expected)', function(){

      var fn = function(){};
      var otherFunction = function(){};

      test
        .function(fn)
          .isNot(otherFunction)
          .isNot(function(){})

        .exception(function(){
          test.function(fn).isNot(fn);
        })
      ;

    });

    it('isIdenticalTo(expected)', function(){

      var fn = function(){};
      var ref = fn;

      test
        .function(ref)
          .isIdenticalTo(fn)

        .exception(function(){
          test.function(fn).isIdenticalTo(function(){});
        })
      ;

    });

    it('isNotIdenticalTo(expected)', function(){

      var fn = function(){};
      var otherFunction = function(){};

      test
        .function(fn)
          .isNotIdenticalTo(otherFunction)
          .isNotIdenticalTo(function(){})

        .exception(function(){
          test.function(fn).isNotIdenticalTo(fn);
        })
      ;

    });

    it('isEqualTo(expected)', function(){

      var fn = function(){};
      var ref = fn;

      test
        .function(ref)
          .isEqualTo(fn)

        .exception(function(){
          test.function(fn).isEqualTo(function(){});
        })
      ;

    });

    it('isNotEqualTo(expected)', function(){

      var fn = function(){};
      var otherFunction = function(){};

      test
        .function(fn)
          .isNotEqualTo(otherFunction)
          .isNotEqualTo(function(){})

        .exception(function(){
          test.function(fn).isNotEqualTo(fn);
        })
      ;

    });

    it('match(expected)', function(){

      var fn = function(){
        return 'hello';
      };

      function myFunction(){
      };

      test
        .function(fn)
          .match('function')
          .match('func')
          .match(function(it){
            return it() === 'hello';
          })

        .function(Date)
          .match('Date')

        .function(myFunction)
          .match('myFunction')
          .match(/my/)
          .match(/[a-z]/i)

        .case('Test failure', function(){

          test
            .exception(function(){

              test.function(fn).match(function(it){
                return it() === 'hey';
              });

            })

            .exception(function(){
              test.function(fn).match('someFunction');
            })

            .exception(function(){
              test.function(myFunction).match(/someFunction/);
            })
          ;
        })
      ;

    });

    it('notMatch(expected)', function(){

      var fn = function(){
        return 'hello';
      };

      function myFunction(){
      };

      test
        .function(fn)
          .notMatch('foo')
          .notMatch(/[A-Z]/)
          .notMatch(function(it){
            return it() === 'hey';
          })

        .function(Date)
          .notMatch('foo')

        .function(myFunction)
          .notMatch('someFunction')
          .notMatch(/some/)

        .case('Test failure', function(){

          test
            .exception(function(){

              test.function(fn).notMatch(function(it){
                return it() === 'hello';
              });

            })

            .exception(function(){
              test.function(fn).notMatch('function');
            })

            .exception(function(){
              test.function(myFunction).notMatch(/myFunction/);
            })

            .exception(function(){
              test.function(myFunction).notMatch(/my/);
            })

            .exception(function(){
              test.function(myFunction).notMatch('myFunction');
            })
          ;
        })
      ;

    });

    it('isValid(expected)', function(){

      var fn = function(){
        return 'hello';
      };

      function myFunction(){
      };

      test
        .function(fn)
          .isValid('function')
          .isValid('func')
          .isValid(function(it){
            return it() === 'hello';
          })

        .function(Date)
          .isValid('Date')

        .function(myFunction)
          .isValid('myFunction')
          .isValid(/my/)
          .isValid(/[a-z]/i)

        .case('Test failure', function(){

          test
            .exception(function(){

              test.function(fn).isValid(function(it){
                return it() === 'hey';
              });

            })

            .exception(function(){
              test.function(fn).isValid('someFunction');
            })

            .exception(function(){
              test.function(myFunction).isValid(/someFunction/);
            })
          ;
        })
      ;

    });

    it('isNotValid(expected)', function(){

      var fn = function(){
        return 'hello';
      };

      function myFunction(){
      };

      test
        .function(fn)
          .isNotValid('foo')
          .isNotValid(/[A-Z]/)
          .isNotValid(function(it){
            return it() === 'hey';
          })

        .function(Date)
          .isNotValid('foo')

        .function(myFunction)
          .isNotValid('someFunction')
          .isNotValid(/some/)

        .case('Test failure', function(){

          test
            .exception(function(){

              test.function(fn).isNotValid(function(it){
                return it() === 'hello';
              });

            })

            .exception(function(){
              test.function(fn).isNotValid('function');
            })

            .exception(function(){
              test.function(myFunction).isNotValid(/myFunction/);
            })

            .exception(function(){
              test.function(myFunction).isNotValid(/my/);
            })

            .exception(function(){
              test.function(myFunction).isNotValid('myFunction');
            })
          ;
        })
      ;

    });

    it('throws([constructor|expected], [expected])', function(){

      var fn = function(){};

      var trigger = function(){
        throw new Error('Whoops!');
      };

      test
        .function(trigger)
          .throws()
          .throws('Whoops!')
          .throws(/whoops/i)
          .throws(Error)
          .throws(Error, /whoops/i)

        .case('Test failure', function(){

          test
            .value(function(){
              test.function(fn).throws();
            })
            .throws()

            .value(function(){
              test.function(trigger).throws(TypeError);
            })
            .throws()

            .value(function(){
              test.function(trigger).throws('gloops');
            })
            .throws()

            .value(function(){
              test.function(trigger).throws(/gloops/);
            })
            .throws()

            .value(function(){
              test.function(trigger).throws(TypeError, 'gloops');
            })
            .throws()

            .value(function(){
              test.function(trigger).throws(Error, 'whoops');
            })
            .throws()
          ;

        })
      ;

    });

    it('isError()', function(){

      var trigger = function(){
        throw new Error('Whoops!');
      };

      test
        .function(trigger)
          .isError()

        .case('Test failure', function(){

          test
            .value(function(){
              test.function(function(){}).isError();
            })
            .throws()

            .value(function(){
              test
                .function(function(){
                  throw 'error';
                })
                .isError()
              ;
            })
            .throws()
          ;
        })
      ;

    });

    it('hasName(expected)', function(){

      var fn = function(){};

      function myFunction(){
      };

      test
        .function(Date)
          .hasName('Date')

        .function(myFunction)
          .hasName('myFunction')

        .case('Test failure', function(){

          test
            .exception(function(){
              test.function(new Date()).hasName('RegExp');
            })

            .exception(function(){
              test.function(myFunction).hasName('function');
            })
          ;
        })
      ;
    });

  });
});