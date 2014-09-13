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

describe('Asserter exception()', function(){

  describe('exception() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      test
        .value(test.exception(function(){ throw new Error('hu'); }).hasHeader)
          .isUndefined()

        .value(test.exception(function(){ throw new Error('hu'); }).isBetween)
          .isUndefined()
    });

    it('Takes a function that will throws an exception', function(){

      var
        indicator,
        trigger = function(){

          indicator = true;
          throw new Error("I'm a ninja !");
        }
      ;

      // Apply the trigger and assert that an exception is thrown
      test
        .exception(trigger)

        // just for the example and for the test
        .bool(indicator).isTrue()

        .given(indicator = false)
          .exception(function(){

            indicator = true;
            throw new Error('Whoops!');
          })

          // just for the example and for the test
          .bool(indicator).isTrue()

      ;
    });

    it("Error if the trigger don't throws an exception", function(){

      var indicator;

      test
        .given(indicator = false)
          .value(function(){
            // no error thrown by the trigger,
            // then throw 'Error: Missing expected exception'
            test.exception(function(){
              indicator = true;
            });
          })
          .throws()

          // just for the example and for the test
          .bool(indicator).isTrue()
      ;
    });

    it('Assert that thrown with the Error class and a given message', function(){

      var
        // create an indicator for monitoring the example and the test
        indicator = test.createCollection(),

        fn = function(){

          indicator.set('error constructor called', true);
          throw new Error("I'm a ninja !");
        },

        resetIndicator = function(){
          // empty
          indicator.setAll({});
        },
        exception
      ;

      test
        .exception(fn)
          .isError()
          .hasMessage("I'm a ninja !")

        // just for the example and for the test
        .bool(indicator.get('error constructor called')).isTrue()

        .when(exception = test.exception(fn))
          .exception(function(){

            // fails because is not the error message
            exception.isError().hasMessage("I'm a not ninja !");
          })

        .given(resetIndicator())

          // Assert that thrown with the Error class
          // and with the message (regExp)
          .exception(fn)
            .isError()
            .hasMessage(/ninja/)

          // just for the example and for the test
          .bool(indicator.get('error constructor called')).isTrue()

          .when(exception = test.exception(fn))
            .exception(function(){

              // fails because 'ninjaa' is not in error message
              exception.isError().hasMessage(/ninjaa/);
            })


        .given(resetIndicator())
          .exception(function(){

            indicator.set('Whoops error, is called', true);

            throw new Error('Whoops!');
          })
          .hasMessage('Whoops!')
          .isInstanceOf(Error)

          // just for the example and for the test
          .bool(indicator.get('Whoops error, is called')).isTrue()
      ;
    });

    it('dependency injection', function() {

      var spy = test.spy();

      test.$di.set('spyException', spy);

      test
        .exception(function() {

          this.spyException('arg1', 'arg2');

          throw new Error('Whoops!');
        })
        .bool(spy.calledOnce && spy.calledWithExactly('arg1', 'arg2'))
          .isTrue()
      ;
    });
  });

  describe('Assertions of exception()', function(){

    it('is(expected)', function(){

      var error = new Error('Whoops !');

      var trigger = function(){
        throw error;
      };

      test
        .exception(trigger)
          .is(error)
          .is(new Error('Whoops !'))

        .case('Test failure', function(){
          test
            .value(function(){
              test.exception(trigger).is({message: 'Whoops !'});
            })
            .throws()

            .value(function(){
              test.exception(trigger).is(new String('Whoops !'));
            })
            .throws()
          ;
        }) // end: Test failure
      ;
    });

    it('isNot(expected)', function(){
      var error = new Error('Whoops !');

      var trigger = function(){
        throw error;
      };

      test
        .exception(trigger)
          .isNot({message: 'Whoops !'})

        // Test failure
        .value(function(){
          test.exception(trigger).isNot(error);
        })
        .throws()
      ;
    });

    it('isIdenticalTo(expected)', function(){

      var error = new Error('Whoops !');

      var trigger = function(){
        throw error;
      };

      test
        .exception(trigger)
          .isIdenticalTo(error)

        // Test failure
        .value(function(){
          test.exception(trigger).isIdenticalTo(new Error('Whoops !'));
        })
        .throws()
      ;
    });

    it('isNotIdenticalTo(expected)', function(){

      var error = new Error('Whoops !');

      var trigger = function(){
        throw error;
      };

      test
        .exception(trigger)
          .isNotIdenticalTo(new Error('Whoops !'))

        // Test failure
        .value(function(){
          test.exception(trigger).isNotIdenticalTo(error);
        })
        .throws()
      ;
    });

    it('isEqualTo(expected)', function(){

      var error = new Error('Whoops !');

      var trigger = function(){
        throw error;
      };

      test
        .exception(trigger)
          .isEqualTo(error)

        // Test failure
        .value(function(){
          test.exception(trigger).isEqualTo(new Error('Whoops !'));
        })
        .throws()
      ;
    });

    it('isNotEqualTo(expected)', function(){

      var error = new Error('Whoops !');

      var trigger = function(){
        throw error;
      };

      test
        .exception(trigger)
          .isNotEqualTo(new Error('Whoops !'))

        // Test failure
        .value(function(){
          test.exception(trigger).isNotEqualTo(error);
        })
        .throws()
      ;
    });

    it('match(expected)', function(){

      var
        // create an indicator for monitoring the example and the test
        indicator = test.createCollection(),


        trigger = function(){
          indicator.set('error trigger called', true);
          throw new Error('Whoops!');
        }
      ;

      test
        .exception(trigger)

          .match('Whoops!')
          .match(/Whoops/)
          .match(function(exception){
            indicator.set('custom error validation called', true);

            return (exception instanceof Error) && /whoops/i.test(exception);
          })

        // just for the example and for the test
        .bool(indicator.get('error trigger called')).isTrue()
        .bool(indicator.get('custom error validation called')).isTrue()

        .case('Test failure', function(){

          test
            .value(function(){
              test.exception(trigger).match('Hey');
            })
            .throws()

            .value(function(){
              test.exception(trigger).match(/Hey/);
            })
            .throws()

            .value(function(){
              test.exception(trigger).match(function(error){
                return error instanceof RegExp;
              });
            })
            .throws()
          ;
        }) // end: Test failure
      ;
    });

    it('notMatch(expected)', function(){

      var
        // create an indicator for monitoring the example and the test
        indicator = test.createCollection(),

        trigger = function(){
          indicator.set('error trigger called', true);
          throw new Error('Whoops!');
        }
      ;

      test
        .exception(trigger)

          .notMatch('Yeah an error')
          .notMatch(/Yeah/)
          .notMatch(function(exception){
            indicator.set('custom error validation called', true);

            return /yeah/.test(exception);
          })

        // just for the example and for the test
        .bool(indicator.get('error trigger called')).isTrue()
        .bool(indicator.get('custom error validation called')).isTrue()

        .case('Test failure', function(){

          test
            .value(function(){
              test.exception(trigger).notMatch('Whoops!');
            })
            .throws()

            .value(function(){
              test.exception(trigger).notMatch(/Whoops/);
            })
            .throws()
          ;
        }) // end: Test failure
      ;
    });

    it('isValid(expected)', function(){

      var
        // create an indicator for monitoring the example and the test
        indicator = test.createCollection(),


        trigger = function(){
          indicator.set('error trigger called', true);
          throw new Error('Whoops!');
        }
      ;

      test
        .exception(trigger)

          .isValid('Whoops!')
          .isValid(/Whoops/)
          .isValid(function(exception){
            indicator.set('custom error validation called', true);

            return (exception instanceof Error) && /whoops/i.test(exception);
          })

        // just for the example and for the test
        .bool(indicator.get('error trigger called')).isTrue()
        .bool(indicator.get('custom error validation called')).isTrue()

        .case('Test failure', function(){

          test
            .value(function(){
              test.exception(trigger).isValid('Hey');
            })
            .throws()

            .value(function(){
              test.exception(trigger).isValid(/Hey/);
            })
            .throws()

            .value(function(){
              test.exception(trigger).isValid(function(error){
                return error instanceof RegExp;
              });
            })
            .throws()
          ;
        }) // end: Test failure
      ;
    });

    it('isNotValid(expected)', function(){

      var
        // create an indicator for monitoring the example and the test
        indicator = test.createCollection(),

        trigger = function(){
          indicator.set('error trigger called', true);
          throw new Error('Whoops!');
        }
      ;

      test
        .exception(trigger)

          .isNotValid('Yeah an error')
          .isNotValid(/Yeah/)
          .isNotValid(function(exception){
            indicator.set('custom error validation called', true);

            return /yeah/.test(exception);
          })

        // just for the example and for the test
        .bool(indicator.get('error trigger called')).isTrue()
        .bool(indicator.get('custom error validation called')).isTrue()

        .case('Test failure', function(){

          test
            .value(function(){
              test.exception(trigger).isNotValid('Whoops!');
            })
            .throws()

            .value(function(){
              test.exception(trigger).isNotValid(/Whoops/);
            })
            .throws()
          ;
        }) // end: Test failure
      ;
    });

    it('isType(expected)', function(){

      var trigger = function(){
        throw new Error('Whoops !');
      };

      test
        .exception(trigger)
          .isType('object')

        .exception(function(){
          throw 'Whoops !';
        })
        .isType('string')

        // Test failure
        .value(function(){
          test.exception(trigger).isType('function');
        })
        .throws()
      ;
    });

    it('isNotType(expected)', function(){

      var trigger = function(){
        throw new Error('Whoops !');
      };

      test
        .exception(trigger)
          .isNotType('string')

        .exception(function(){
          throw 'Whoops !';
        })
        .isNotType('object')

        // Test failure
        .value(function(){
          test.exception(trigger).isNotType('object');
        })
        .throws()
      ;
    });

    it('isObject()', function(){

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .isObject()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw 'error';
            })
            .isObject()
          ;

        })
        .throws()
      ;

    });

    it('isArray()', function(){

      test
        .exception(function(){
          throw ['error'];
        })
        .isArray()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Error('Whoops !');
            })
            .isArray()
          ;

        })
        .throws()
      ;

    });

    it('isString()', function(){

      test
        .exception(function(){
          throw 'error';
        })
        .isString()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Error('Whoops !');
            })
            .isString()
          ;
        })
        .throws()
      ;

    });

    it('isNumber()', function(){

      test
        .exception(function(){
          throw 0;
        })
        .isNumber()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw '0';
            })
            .isNumber()
          ;
        })
        .throws()
      ;

    });

    it('isBool()', function(){

      test
        .exception(function(){
          throw false;
        })
        .isBool()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw 0;
            })
            .isBool()
          ;
        })
        .throws()
      ;

    });

    it('isBoolean()', function(){

      test
        .exception(function(){
          throw true;
        })
        .isBoolean()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw 1;
            })
            .isBoolean()
          ;
        })
        .throws()
      ;

    });

    it('isNull()', function(){

      test
        .exception(function(){
          throw null;
        })
        .isNull()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw 0;
            })
            .isNull()
          ;
        })
        .throws()
      ;

    });

    it('isUndefined()', function(){

      test
        .exception(function(){
          throw undefined;
        })
        .isUndefined()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw 0;
            })
            .isUndefined()
          ;
        })
        .throws()
      ;

    });

    /////////////////////
      // Types augmented //
      /////////////////////

    it('isRegExp()', function(){

      test
        .exception(function(){
          throw new RegExp('whoops');
        })
        .isRegExp()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Error('Whoops !');
            })
            .isRegExp()
          ;

        })
        .throws()
      ;

    });

    it('isNotRegExp()', function(){

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .isNotRegExp()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new RegExp('whoops');
            })
            .isNotRegExp()
          ;

        })
        .throws()
      ;

    });

    it('isDate()', function(){

      test
        .exception(function(){
          throw new Date();
        })
        .isDate()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Error('Whoops !');
            })
            .isDate()
          ;

        })
        .throws()
      ;

    });

    it('isNotDate()', function(){

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .isNotDate()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Date();
            })
            .isNotDate()
          ;

        })
        .throws()
      ;

    });

    it('isArguments()', function(){

      var error = function(){
        return arguments;
      };

      test
        .exception(function(){
          throw error(1, 2, 3);
        })
        .isArguments()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Error('Whoops !');
            })
            .isArguments()
          ;

        })
        .throws()
      ;

    });

    it('isNotArguments()', function(){

      var error = function(){
        return arguments;
      };

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .isNotArguments()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw error(1, 2, 3);
            })
            .isNotArguments()
          ;

        })
        .throws()
      ;

    });

    it('isEmpty()', function(){

      test
        .exception(function(){
          throw '';
        })
        .isEmpty()

        .exception(function(){
          throw [];
        })
        .isEmpty()

        .exception(function(){
          throw {};
        })
        .isEmpty()

        // Indeed an instance of `Error` has no enumerable properties.
        .exception(function(){
          throw new Error('Whoops !');
        })
        .isEmpty()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw 'Whoops !';
            })
            .isEmpty()
          ;

        })
        .throws()
      ;

    });

    it('isNotEmpty()', function(){

      test
        .exception(function(){
          throw 'Whoops !';
        })
        .isNotEmpty()

        .case('Test failure', function(){

          test
            .value(function(){
              test
                .exception(function(){
                  throw '';
                })
                .isNotEmpty()
              ;
            })
            .throws()

            .value(function(){
              test
                .exception(function(){
                  throw [];
                })
                .isNotEmpty()
              ;
            })
            .throws()

            .value(function(){
              test
                .exception(function(){
                  throw {};
                })
                .isNotEmpty()
              ;
            })
            .throws()

            .value(function(){

              // Indeed an instance of `Error` has no enumerable properties.
              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .isNotEmpty()
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;
    });

    it('isError()', function(){

      // isError() assertion is an alias of isInstanceOf(Error)

      var

        // create an indicator for monitoring the example and the test
        indicator = test.createCollection(),

        trigger = function(){

          indicator.set('error constructor called', true);
          throw new Error("I'm a ninja !");
        },

        resetIndicator = function(){
          // empty
          indicator.setAll({});
        }
      ;

      test
        // Assert that thrown with the Error class
        .exception(trigger)
          .isInstanceOf(Error)

        // just for the example and for the test
        .bool(indicator.get('error constructor called')).isTrue()

        // or shortcut
        .given(resetIndicator())
          // Assert that thrown with the Error class
          .exception(trigger)
            .isError()

          // just for the example and for the test
          .bool(indicator.get('error constructor called')).isTrue()
      ;
    });

     ////////////////////
       // Quantification //
       ////////////////////

    it('hasLength(expected)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasLength(2)

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw {message: 'error', code: 42};
            })
            .hasLength(1)
          ;

        })
        .throws()
      ;

    });

    it('hasNotLength(expected)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasNotLength(1)
        .hasNotLength(3)

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw {message: 'error', code: 42};
            })
            .hasNotLength(2)
          ;

        })
        .throws()
      ;

    });

    ////////////////
      // Containers //
      ////////////////

    it('isEnumerable(property)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .isEnumerable('message')
        .isEnumerable('code')

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Error('Whoops !');
            })
            .isEnumerable('message')
          ;

        })
        .throws()
      ;

    });

    it('isNotEnumerable(property)', function(){

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .isNotEnumerable('message')

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw {message: 'error', code: 42};
            })
            .isNotEnumerable('message')
          ;

        })
        .throws()
      ;

    });

    it('isFrozen()', function(){

      var
        error = {message: 'error', code: 42},
        frozenError = {message: 'error', code: 42}
      ;

      Object.freeze(frozenError);

      test
        .exception(function(){
          throw frozenError;
        })
        .isFrozen()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw error;
            })
            .isFrozen()
          ;

        })
        .throws()
      ;

    });

    it('isNotFrozen()', function(){

      var
        error = {message: 'error', code: 42},
        frozenError = {message: 'error', code: 42}
      ;

      Object.freeze(frozenError);

      test
        .exception(function(){
          throw error;
        })
        .isNotFrozen()

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw frozenError;
            })
            .isNotFrozen()
          ;

        })
        .throws()
      ;

    });

    it('isInstanceOf(expected)', function(){

      test
        .exception(function(){
          throw new TypeError('Whoops !');
        })
        .isInstanceOf(TypeError)

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new Error('Bad type');
            })
            .isInstanceOf(TypeError)
          ;

        })
        .throws()
      ;

    });

    it('isNotInstanceOf(expected)', function(){

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .isNotInstanceOf(TypeError)

        // Test failure
        .value(function(){

          test
            .exception(function(){
              throw new TypeError('Bad type');
            })
            .isNotInstanceOf(TypeError)
          ;

        })
        .throws()
      ;

    });

    it('hasProperty(property [, value])', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasProperty('message')
        .hasProperty('code', 42)

        .exception(function(){
          throw new Error('Whoops !');
        })
        .hasProperty('message')
        .hasProperty('message', 'Whoops !')
        .hasProperty('constructor')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasProperty('foo')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasProperty('code', 1)
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasNotProperty(property [, value])', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasNotProperty('foo')
        .hasNotProperty('code', 1)

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasNotProperty('message')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasNotProperty('code', 42)
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .hasNotProperty('constructor')
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasOwnProperty(property [, value])', function(){

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .hasOwnProperty('message')
        .hasOwnProperty('message', 'Whoops !')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .hasOwnProperty('foo')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .hasOwnProperty('message', 'Grrrr !')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .hasOwnProperty('constructor')
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasNotOwnProperty(property [, value])', function(){

      test
        .exception(function(){
          throw new Error('Whoops !');
        })
        .hasNotOwnProperty('foo')
        .hasNotOwnProperty('message', 'Grrrr !')
        .hasNotOwnProperty('constructor')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .hasNotOwnProperty('message')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .hasNotOwnProperty('message', 'Whoops !')
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasProperties(properties)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasProperties(['message', 'code'])

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasProperties(['message', 'code', 'foo'])
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasProperties(['message'])
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasNotProperties(properties)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasNotProperties(['foo', 'bar'])
        .hasNotProperties(['foo', 'code', 'bar'])

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasNotProperties(['message', 'code'])
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    // TODO: test inheritance
    it('hasOwnProperties(properties)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasOwnProperties(['message', 'code'])

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasOwnProperties(['message', 'code', 'foo'])
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasOwnProperties(['message'])
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasKey(key [, value])', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasKey('message')
        .hasKey('code', 42)

        .exception(function(){
          throw new Error('Whoops !');
        })
        .hasKey('message')
        .hasKey('message', 'Whoops !')
        .hasKey('constructor')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasKey('foo')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasKey('code', 1)
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('notHasKey(key [, value])', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .notHasKey('foo')
        .notHasKey('code', 1)

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .notHasKey('message')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .notHasKey('code', 42)
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw new Error('Whoops !');
                })
                .notHasKey('constructor')
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasKeys(keys)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasKeys(['message', 'code'])

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasKeys(['message', 'code', 'foo'])
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasKeys(['message'])
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('notHasKeys(keys)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .notHasKeys(['foo', 'bar'])
        .notHasKeys(['foo', 'code', 'bar'])

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .notHasKeys(['message', 'code'])
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasValue(expected)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasValue('error')
        .hasValue(42)

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasValue('err')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasValue(2)
              ;

            })
            .throws()
        })
      ;
    });

    it('notHasValue(expected)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .notHasValue('err')
        .notHasValue(2)

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .notHasValue('error')
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .notHasValue(42)
              ;

            })
            .throws()
        })
      ;
    });

    it('hasValues(expected)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .hasValues(['error'])
        .hasValues(['error', 42])

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasValues(['foo'])
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .hasValues(['error', 42, 'foo'])
              ;

            })
            .throws()
        })
      ;
    });

    it('notHasValues(expected)', function(){

      test
        .exception(function(){
          throw {message: 'error', code: 42};
        })
        .notHasValues(['code'])
        .notHasValues(['message', 'code', 'foo'])

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .notHasValues(['error'])
              ;

            })
            .throws()

            .value(function(){

              test
                .exception(function(){
                  throw {message: 'error', code: 42};
                })
                .notHasValues(['foo', 'error'])
              ;

            })
            .throws()
        })
      ;
    });

    it('contains(expected [, ...])', function(){

      test
        .exception(function(){
          throw new Error('Whoops');
        })
        .contains({message: 'Whoops'})

        // Test failure
        .value(function(){

            test
              .exception(function(){
                throw new Error('Whoops');
              })
              .contains({message: 'foo'})
            ;

          })
          .throws()
      ;
    });

    it('notContains(expected [, ...])', function(){

      test
        .exception(function(){
          throw new Error('Whoops');
        })
        .notContains({message: 'foo'})

        // Test failure
        .value(function(){

            test
              .exception(function(){
                throw new Error('Whoops');
              })
              .notContains({message: 'Whoops'})
            ;

          })
          .throws()
      ;
    });

    it('startsWith(str)', function(){

      test
        .exception(function(){
          throw 'An error occured';
        })
        .startsWith('An error')

        // Test failure
        .value(function(){

            test
              .exception(function(){
                throw 'An error occured';
              })
              .startsWith('error')
            ;

          })
          .throws()
      ;
    });

    it('notStartsWith(str)', function(){

      test
        .exception(function(){
          throw 'An error occured';
        })
        .notStartsWith('error')

        // Test failure
        .value(function(){

            test
              .exception(function(){
                throw 'An error occured';
              })
              .notStartsWith('An error')
            ;

          })
          .throws()
      ;

    });

    it('endsWith(str)', function(){

      test
        .exception(function(){
          throw 'An error occured';
        })
        .endsWith('occured')

        // Test failure
        .value(function(){

            test
              .exception(function(){
                throw 'An error occured';
              })
              .endsWith('error')
            ;

          })
          .throws()
      ;

    });

    it('notEndsWith(str)', function(){

      test
        .exception(function(){
          throw 'An error occured';
        })
        .notEndsWith('error')

        // Test failure
        .value(function(){

            test
              .exception(function(){
                throw 'An error occured';
              })
              .notEndsWith('occured')
            ;

          })
          .throws()
      ;

    });

    ////////////////
    // specific //
    ////////////////

    it('hasMessage(expected)', function(){

      var

        // create an indicator for monitoring the example and the test
        indicator = test.createCollection(),

        trigger = function(){

          indicator.set('error constructor called', true);
          throw new Error("I'm a ninja !");
        },

        resetIndicator = function(){

          // empty
          indicator.setAll({});
        },
        exception
      ;

      test
        .exception(trigger)
          .hasMessage("I'm a ninja !")

        // just for the example and for the test
        .bool(indicator.get('error constructor called')).isTrue()

        // reset indicator
        // 'then' does nothing, is just pass-through method for a fluent chain.
        .then(resetIndicator())

          .exception(trigger)
            .hasMessage(/ninja/)

          // just for the example and for the test
          .bool(indicator.get('error constructor called')).isTrue()

        // reset indicator
        .then(resetIndicator())

        // out of trigger block,
        // because test.exception(trigger) throws the trigger in the block
        // also you can use test.value().throws() (see after)
        .case(exception = test.exception(trigger))
          .exception(function(){

            indicator.set('ninjaa is not in error message', true);

            // fails because ninjaa is not in error message
            exception.hasMessage(/ninjaa/);
          })

          // just for the example and for the test
          .bool(indicator.get('error constructor called')).isTrue()
          .bool(indicator.get('ninjaa is not in error message')).isTrue()

        // the above example is equal to
        .then(resetIndicator())

          .value(function(){

            indicator.set('ninjaa is not in error message', true);

            // fails because ninjaa is not in error message
            test.exception(trigger).hasMessage(/ninjaa/);
          })
          .throws()

          // just for the example and for the test
          .bool(indicator.get('error constructor called')).isTrue()
          .bool(indicator.get('ninjaa is not in error message')).isTrue()
      ;
    });
  });
});