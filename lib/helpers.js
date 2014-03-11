/**
 * This file is part of the Unit.js testing framework.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 * 
 * For the full copyright and license information, please view 
 * the LICENSE file that was distributed with this source code 
 * or visit {@link http://unitjs.com|Unit.js}.
 *
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 */

'use strict';

var 
  noder = require('noder.io'),
  util  = require('./util')
;

module.exports = {

  //
  // Fluent readability and expressions helpers
  //
  
  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called.
   * @see given
   * @see when
   * @see if
   * @see and
   * @return {Object} The current instance
   */
  case: function() {

    if (arguments.length) {

      for (var arg in arguments) {

        if (typeof arguments[arg] === 'function') {
          arguments[arg]();
        }
      }
    }

    return this;
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called.
   * @see case
   * @see when
   * @see then
   * @return {Object} The current instance
   */
  given: function() {
    return this.case.apply(this, arguments);
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called.
   * @see case
   * @see given
   * @see then
   * @return {Object} The current instance
   */
  when: function() {
    return this.case.apply(this, arguments);
  },


  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * If a function is passed, it is called. 
   * @see case
   * @see given
   * @see when
   * @return {Object} The current instance 
   */
  then: function() {
    return this.case.apply(this, arguments);
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * 
   * @see and
   * @return {Object} The current instance 
   */
  get if () {
    return util.chain.call(this, this.case);
  },

  /**
   * It does nothing, is just pass-through method for a fluent chain.
   * 
   * @see if
   * @return {Object} The current instance 
   */
  get and() {
    return util.chain.call(this, this.case);
  },

  //
  // Helpers
  // 
  
  /**
   * Dump the arguments.
   * If no argument is passed, the actual tested value is dumped.
   * @return {Object} The current instance
   */
  dump: function() {

    var br    = '======================';
    var br2   = '______________________';
    var space = '                             ';
    var n     = 0;

    console.log('\n' + br + ' Unit.js dump: start ' + br);

    if (arguments.length == 0) {
      console.log('\n' + br2 + br2 + br2 + '\n' + space + '[actual]\n\n');
      console.log(this.actual);
    }else{
      for (var k in arguments) {
        n++;
        console.log('\n' + br2 + br2 + br2 + '\n' + space + '[dump %s]\n\n', n);
        console.log(arguments[k]);

      }
    }
    console.log('\n' + br + ' Unit.js dump: end ' + br + '\n');

    return this;
  },

  /**
   * Create a collection container.
   * @return {Object} The current instance
   */
  createCollection: function() {

    if(arguments.length)
      return new noder.Collection(arguments[0]);

    return new noder.Collection();
  }
};