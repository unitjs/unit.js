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

// object
var rawAssertions = require('../../../src/assertions');


describe('Asserter undefined()', function(){

  describe('undefined() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      var assertions = rawAssertions.call(this, undefined);

      for(var method in assertions){

        // if is the native (inherited) method Object.hasOwnProperty
        if(method == 'hasOwnProperty'
          && test.undefined(undefined)[method] === Object.hasOwnProperty)
          continue;

        test.value(test.undefined(undefined)[method]).isUndefined();
      }

      // ensures the test method
      test.exception(function(){
        test.value(test.undefined(undefined)['hasOwnProperty']).isUndefined();
      });

    });

    it('Assert that the tested value is `undefined`', function(){

      test
        .undefined(undefined)
        .undefined()

        .case('Test failure', function(){

          test
            .exception(function(){
              test.undefined(0);
            })

            .exception(function(){
              test.undefined(1);
            })

            .exception(function(){
              test.undefined('undefined');
            })

            .exception(function(){
              test.undefined(null);
            })

            .exception(function(){
              test.undefined(false);
            })

            .exception(function(){
              test.undefined(true);
            })

            .exception(function(){
              test.undefined('');
            })

            .exception(function(){
              test.undefined([]);
            })

            .exception(function(){
              test.undefined({});
            })

            .exception(function(){
              test.undefined(function(){});
            })
          ;

        })
      ;

    });

  });

});