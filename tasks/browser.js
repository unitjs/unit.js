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

var gulp           = require('gulp');
var replace        = require('gulp-replace');
var uglify         = require('gulp-uglify');
var gwebpack       = require('webpack-stream');
var webpack        = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var rmrf           = require('spawn-rmrf');
var path           = require('path');
var promise        = require('bluebird');
var pkg            = require('../package.json');
var fs             = promise.promisifyAll(require('fs'));
var rootPath       = path.join(__dirname, '..');

var bannerUnitJS = {
  banner: 'Unit.js v'+ pkg.version
  + ' | (c) '+ (new Date().getFullYear()) +' Nicolas Tallefourtane'
  + ' | http://unitjs.com/license.html'
};


// build unit.js for browser
gulp.task('browser.build', function(done) {
  distClean(function() {
    tmpClean(function() {

      // build browser sources
      buildSrc(function() {

        // run webpack
        buildWebPack(function() {

          // copy unit.js file to test directory
          gulp.src('./browser/dist/*.js')
            .pipe(gulp.dest('./browser/test'))
            .on('end', function() {
              tmpClean(done);
            });
          });
      });
    });
  });
});


/*----------------------------------------------------------------------------*\
  Cleaner
\*----------------------------------------------------------------------------*/

function distClean(done){
  rmrf(rootPath + '/browser/dist', done);
}

function tmpClean(done){
  rmrf(rootPath + '/browser/tmp', done);
}


/*----------------------------------------------------------------------------*\
  Utils
\*----------------------------------------------------------------------------*/

// Build browser source
function buildSrc(done) {
  gulp
    .src('./src/**/*')
   .pipe(gulp.dest('./browser/tmp/src'))
   .on('end', function() {

     // buildToSrc > replaceMainSrc > buildAssertersSrc > buildWebPackTests
     // > done
     buildToSrc(function() {
       replaceMainSrc(function() {
         buildAssertersSrc(function() {
           buildWebPackTests(done);
         });
       });
     });
   });
}

// build web pack
function buildWebPack(done) {
  gulp
    .src('unit.js')
    .pipe(gwebpack({
      mode: 'production',
      entry: {
        main: './browser/tmp/src/browser.js'
      },
      output: {
        path: rootPath + '/browser/dist',
        filename: 'unit.js'
      },
      // externals: {
      // },
      plugins: [
        new webpack.IgnorePlugin(/^supertest$/),
        new webpack.IgnorePlugin(/src\/asserters\.js$/),
        new webpack.BannerPlugin(bannerUnitJS)
      ],
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              mangle: false
            }
          })
        ]
      }
    }, webpack))

    .pipe(gulp.dest('./browser/dist'))
    .on('end', done);
}

// build web pack of Unit.js tests
function buildWebPackTests(done) {
  var assertions = [];
  var browserSrc = '';

  gulp
    .src('./src/assertions.js')
    .pipe(replace(/\n/g, ''))
    .pipe(replace(/\s/g, ''))
    .pipe(replace(/([a-zA-Z0-9]+):(function\([a-zA-Z0-9,]*\))/g, function(assertion) {
      assertions.push(assertion + '{}');
    }))
    .pipe(replace(/(.*)/g, function() {
      return 'module.exports = function(actual) { return { ' +
        assertions.join(',') + '}};';
    }))
    .pipe(gulp.dest('./browser/tmp/test/fixtures'))
    .on('end', function() {
      gulp
        .src([
          '!./test/node/',
          '!./test/node/**/*',
          './test/**/*.js'
        ])
       .pipe(replace(
          /var\s*test\s*=\s*require\('[./]+src\/?'\);/,
          ''
        ))
       .pipe(replace(
         // src/asserters/
         /require\('[./]*src\/assertions'\)/,
         'require(\'./fixtures/assertions\')'
        ))
       .pipe(uglify({ mangle: false }))
       .pipe(replace(/(.*)/g, function(data) {
         browserSrc += data;
       }))
       .pipe(gulp.dest('./browser/tmp/test'))
       .on('end', function() {
          fs.appendFile(
            rootPath + '/browser/tmp/test/browser.js',
            browserSrc,
            function(err) {
              if (err) {
                throw err;
              }

              gulp
                .src('tests-unit.js')
                .pipe(gwebpack({
                  mode: 'production',
                  entry: {
                    main: './browser/tmp/test/browser.js'
                  },
                  output: {
                    path: rootPath + '/browser/dist',
                    filename: 'tests-unit.js'
                  },
                  module: {
                    noParse: [ /^\.\/browser\/tmp\/test\/fixtures/ ]
                  },
                  plugins: [
                    new webpack.BannerPlugin(bannerUnitJS)
                  ],
                  optimization: {
                    minimizer: [
                      new UglifyJsPlugin({
                        uglifyOptions: {
                          mangle: false
                        }
                      })
                    ]
                  }
                }, webpack))
                .pipe(gulp.dest('./browser/dist'))
                .on('end', done);
            }); // end: appendFile()
        });
    });
}

// replace/copy specific files
function buildToSrc(done) {
  gulp
    .src('./browser/build/**/*')
    .pipe(gulp.dest('./browser/tmp'))
    .on('end', done);
}

// replace content in the main file
function replaceMainSrc(done) {
  gulp
    .src('./browser/tmp/src/index.js')
    .pipe(replace(/var supertest\s*=\s*require\('supertest'\);/, ''))
    .pipe(replace(/[\s\n]api\.httpAgent\s*=\s*supertest;?/, ''))
    .pipe(gulp.dest('./browser/tmp/src'))
    .on('end', done);
}

// build src/asserters.js
function buildAssertersSrc(done) {
  fs
    .readdirAsync(rootPath + '/browser/tmp/src/asserters')
    .filter(function(filename) {
      return (path.extname(filename) === '.js' &&
        filename !== 'index.js');
    })

    // write (sync) each file with the new content
    .map(function (filename) {
      var asserterName = path.basename(filename, '.js');

      return '' +
        'module.exports.'+ asserterName +' = function(actual) { ' +
        '  var Asserter = require(\'./asserters/'+ asserterName +'\'); ' +
        '  return new Asserter(actual); ' +
        '};'
      ;
    })

    .then(function(asserters) {
      fs.appendFile(rootPath + '/browser/tmp/src/asserters.js',
        asserters.join('\n'),
        function(err) {
          if (err) {
            throw err;
          }
        }
      );
    })
    .catch(done)
    // task is done
    .finally(done)
    .done()
  ;
}