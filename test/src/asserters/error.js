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

describe('Asserter error()', function(){

  describe('error() behavior', function(){

    it('Does not contains inappropriate assertions ' +
      'from the assertions containers', function(){

      var
        indicator = 0,

        trigger = function(){
          throw new Error('Whoops!');
        },

        deletedAssertions = [
          // types
          'isType', 'isNotType', 'isObject', 'isArray', 'isString',
          'isNumber', 'isBool', 'isBoolean', 'isNull', 'isUndefined',

          // types augmented
          'isRegExp', 'isNotRegExp', 'isDate', 'isNotDate', 'isArguments',
          'isNotArguments', 'isEmpty', 'isNotEmpty',

          // quantification
          'hasLength', 'hasNotLength',

          // containers
          'hasProperties', 'hasNotProperties', 'hasOwnProperties',
          'hasKeys', 'notHasKeys',
          'hasValue', 'notHasValue', 'hasValues', 'notHasValues',
          'contains', 'notContains',

          // string
          'startsWith', 'notStartsWith', 'endsWith', 'notEndsWith'

        ]
      ;

      // global
      test
        .value(test.error(trigger).hasHeader)
          .isUndefined()

        .value(test.error(trigger).isInfinite)
          .isUndefined()
      ;

      // inherited from exception
      deletedAssertions.map(function(method){

        test.value(test.error(trigger)[method]).isUndefined();

        indicator++;
      });

      // out of trigger block,
      // beacause test.error(trigger) throws the trigger in the block
      var error = test.error(trigger);

      // ensures the test method
      test.exception(function(){
        test.value(error['hasMessage']).isUndefined();
      });

      test.number(indicator).isIdenticalTo(deletedAssertions.length);
    });

    it('Fails if the tested exception is not an instance of Error', function(){

      var
        allCatch = {number: true, string: true, object: true, array: true},
        status = {number: false, string: false, object: false, array: false},

        check = function(name, trigger){
          try{
            test.error(trigger);
          }catch(e){
            status[name] = true;
          }
        },

        error = function(){
          throw new Error('foo');
        },

        number = function(){
          throw 1;
        },

        string = function(){
          throw 'Error';
        },

        object = function(){
          throw {name: Error, message: 'Whoops!'};
        },

        array = function(){
          throw [Error];
        }
      ;

      test
        .error(error)

        .when(function(){

          check('number', number);  // status[name] = true;
          check('string', string);  // status[name] = true;
          check('object', object);  // status[name] = true;
          check('array', array);    // status[name] = true;
        })
        .object(status)
          .is(allCatch)
      ;

      // for comparing with exception
      var
        allCatch = {number: true, string: true, object: true, array: true},
        status = {number: false, string: false, object: false, array: false},

        check = function(name, trigger){
          try{
            test.exception(trigger);
          }catch(e){
            status[name] = true;
          }
        }
      ;

      test
        .exception(error)
          .isError()

        .when(function(){

          check('number', number);  // not thrown
          check('string', string);  // not thrown
          check('object', object);  // not thrown
          check('array', array);    // not thrown
        })
        .object(status)
          .isNot(allCatch)
          .is({number: false, string: false, object: false, array: false})
      ;
    });

    it('dependency injection', function() {

      var spy = test.spy();

      test.$di.set('spyException', spy);

      test
        .error(function() {

          this.spyException('arg1', 'arg2');

          throw new Error('Whoops!');
        })
        .bool(spy.calledOnce && spy.calledWithExactly('arg1', 'arg2'))
          .isTrue()
      ;
    });
  });

  describe('Assertions of error()', function(){

    it('is(expected)', function(){

      var error = new Error('Whoops !');

      var trigger = function(){
        throw error;
      };

      test
        .error(trigger)
          .is(error)
          .is(new Error('Whoops !'))

        .case('Test failure', function(){
          test
            .value(function(){
              test.error(trigger).is({message: 'Whoops !'});
            })
            .throws()

            .value(function(){
              test.error(trigger).is(new TypeError('Whoops !'));
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
        .error(trigger)
          .isNot({message: 'Whoops !'})

        // Test failure
        .value(function(){
          test.error(trigger).isNot(error);
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
        .error(trigger)
          .isIdenticalTo(error)

        // Test failure
        .value(function(){
          test.error(trigger).isIdenticalTo(new Error('Whoops !'));
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
        .error(trigger)
          .isNotIdenticalTo(new Error('Whoops !'))

        // Test failure
        .value(function(){
          test.error(trigger).isNotIdenticalTo(error);
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
        .error(trigger)
          .isEqualTo(error)

        // Test failure
        .value(function(){
          test.error(trigger).isEqualTo(new Error('Whoops !'));
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
        .error(trigger)
          .isNotEqualTo(new Error('Whoops !'))

        // Test failure
        .value(function(){
          test.error(trigger).isNotEqualTo(error);
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
        .error(trigger)

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
              test.error(trigger).match('Hey');
            })
            .throws()

            .value(function(){
              test.error(trigger).match(/Hey/);
            })
            .throws()

            .value(function(){
              test.error(trigger).match(function(error){
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
        .error(trigger)

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
              test.error(trigger).notMatch('Whoops!');
            })
            .throws()

            .value(function(){
              test.error(trigger).notMatch(/Whoops/);
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
        .error(trigger)

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
              test.error(trigger).isValid('Hey');
            })
            .throws()

            .value(function(){
              test.error(trigger).isValid(/Hey/);
            })
            .throws()

            .value(function(){
              test.error(trigger).isValid(function(error){
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
        .error(trigger)

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
              test.error(trigger).isNotValid('Whoops!');
            })
            .throws()

            .value(function(){
              test.error(trigger).isNotValid(/Whoops/);
            })
            .throws()
          ;
        }) // end: Test failure
      ;
    });

    ////////////////
    // Containers //
    ////////////////

    it('isEnumerable(property)', function(){

      var error = new Error('Whoops !');
      error.foo = 'bar';

      test
        .error(function(){
          throw error;
        })
        .isEnumerable('foo')

        // Test failure
        .value(function(){

          test
            .error(function(){
              throw error;
            })
            .isEnumerable('message')
          ;

        })
        .throws()
      ;

    });

    it('isNotEnumerable(property)', function(){

      var error = new Error('Whoops !');
      error.foo = 'bar';

      test
        .error(function(){
          throw error;
        })
        .isNotEnumerable('message')

        // Test failure
        .value(function(){

          test
            .error(function(){
              throw error;
            })
            .isNotEnumerable('foo')
          ;

        })
        .throws()
      ;

    });

    it('isFrozen()', function(){

      var
        error = new Error('Whoops !'),
        frozenError = new Error('Whoops !')
      ;

      Object.freeze(frozenError);

      test
        .error(function(){
          throw frozenError;
        })
        .isFrozen()

        // Test failure
        .value(function(){

          test
            .error(function(){
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
        error = new Error('Whoops !'),
        frozenError = new Error('Whoops !')
      ;

      Object.freeze(frozenError);

      test
        .error(function(){
          throw error;
        })
        .isNotFrozen()

        // Test failure
        .value(function(){

          test
            .error(function(){
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
        .error(function(){
          throw new TypeError('Whoops !');
        })
        .isInstanceOf(TypeError)

        // Test failure
        .value(function(){

          test
            .error(function(){
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
        .error(function(){
          throw new Error('Whoops !');
        })
        .isNotInstanceOf(TypeError)

        // Test failure
        .value(function(){

          test
            .error(function(){
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
        .error(function(){
          throw new Error('Whoops !');
        })
        .hasProperty('message')
        .hasProperty('message', 'Whoops !')
        .hasProperty('constructor')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasProperty('foo')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasProperty('message', 'whoops')
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('hasNotProperty(property [, value])', function(){

      test
        .error(function(){
          throw new Error('Whoops !');
        })
        .hasNotProperty('foo')
        .hasNotProperty('message', 'whoops')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasNotProperty('message')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasNotProperty('message', 'Whoops !')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
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
        .error(function(){
          throw new Error('Whoops !');
        })
        .hasOwnProperty('message')
        .hasOwnProperty('message', 'Whoops !')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasOwnProperty('foo')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasOwnProperty('message', 'Grrrr !')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
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
        .error(function(){
          throw new Error('Whoops !');
        })
        .hasNotOwnProperty('foo')
        .hasNotOwnProperty('message', 'Grrrr !')
        .hasNotOwnProperty('constructor')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasNotOwnProperty('message')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
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

    it('hasKey(key [, value])', function(){

      test
        .error(function(){
          throw new Error('Whoops !');
        })
        .hasKey('message')
        .hasKey('message', 'Whoops !')
        .hasKey('constructor')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasKey('foo')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .hasKey('message', 'whoops')
              ;

            })
            .throws()
          ;
        }) // end: Test failure
      ;

    });

    it('notHasKey(key [, value])', function(){

      test
        .error(function(){
          throw new Error('Whoops !');
        })
        .notHasKey('foo')
        .notHasKey('message', 'whoops')

        .case('Test failure', function(){

          test
            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .notHasKey('message')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
                  throw new Error('Whoops !');
                })
                .notHasKey('message', 'Whoops !')
              ;

            })
            .throws()

            .value(function(){

              test
                .error(function(){
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
        .error(trigger)
          .hasMessage("I'm a ninja !")

        // just for the example and for the test
        .bool(indicator.get('error constructor called')).isTrue()

        // reset indicator
        // 'then' does nothing, is just pass-through method for a fluent chain.
        .then(resetIndicator())

          .error(trigger)
            .hasMessage(/ninja/)

          // just for the example and for the test
          .bool(indicator.get('error constructor called')).isTrue()

        // reset indicator
        .then(resetIndicator())

        // out of trigger block,
        // because test.error(trigger) throws the trigger in the block
        // also you can use test.value().throws() (see after)
        .case(exception = test.error(trigger))
          .error(function(){

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
            test.error(trigger).hasMessage(/ninjaa/);
          })
          .throws()

          // just for the example and for the test
          .bool(indicator.get('error constructor called')).isTrue()
          .bool(indicator.get('ninjaa is not in error message')).isTrue()
      ;
    });
  });
});