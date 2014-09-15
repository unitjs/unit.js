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

var fs        = require('fs');
var path      = require('path');

  // array of class
var asserters = {};

/**
 * Load all root asserters (object, string, number, value, function, ...)
 * @param  {String} file
 */
fs.readdirSync(__dirname + '/asserters').forEach(function(file) {

  if (path.extname(file) === '.js' && file !== 'index.js') {

    var asserterName = path.basename(file, '.js');

    asserters[asserterName] = require('./asserters/' + asserterName);

    module.exports[asserterName] = function(actual) {

      return new asserters[asserterName](actual);
    };
  }
});