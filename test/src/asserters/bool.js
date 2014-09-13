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

describe('Asserter bool()', function(){

  describe('bool() behavior', function(){

    it('Does not contains assertions from the assertions containers', function(){

      test
        .value(test.bool(true).hasHeader)
          .isUndefined()

        .value(test.bool(true).hasProperty)
          .isUndefined()

        .value(test.bool(true).hasMessage)
          .isUndefined()
      ;

    });

    it('Assert that the tested value is a `boolean`', function(){

      test
        .bool(true)
        .bool(false)

        .case('Test failure', function(){

          test
            .exception(function(){
              test.bool();
            })
            .exception(function(){
              test.bool(0);
            })
            .exception(function(){
              test.bool(1);
            })
            .exception(function(){
              test.bool(undefined);
            })
            .exception(function(){
              test.bool(null);
            })
            .exception(function(){
              test.bool('');
            })
            .exception(function(){
              test.bool('true');
            })
            .exception(function(){
              test.bool('false');
            })
            .exception(function(){
              test.bool('1');
            })
            .exception(function(){
              test.bool('0');
            })
            .exception(function(){
              test.bool([]);
            })
            .exception(function(){
              test.bool({});
            })
            .exception(function(){
              test.bool(new Boolean('false')).isFalse(); // object
            })
            .exception(function(){
              test.bool(Boolean('false')).isFalse();
            })
          ;
        })
      ;
    });

  });

  describe('Assertions of bool()', function(){

    it('isTrue()', function(){

      test
        .bool(true)
          .isTrue()

        .exception(function(){
          test.bool(false).isTrue();
        })
      ;

    });

    it('isNotTrue()', function(){

      test
        .bool(false)
          .isNotTrue()

        .exception(function(){
          test.bool(true).isNotTrue();
        })
      ;

    });

    it('isFalse()', function(){

      test
        .bool(false)
          .isFalse()

        .exception(function(){
          test.bool(true).isFalse();
        })
      ;
    });

    it('isNotFalse()', function(){

      test
        .bool(true)
          .isNotFalse()

        .exception(function(){
          test.bool(false).isNotFalse();
        })
      ;

    });

  });
});