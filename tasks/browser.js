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

var gulp     = require('gulp');
var replace  = require('gulp-replace');
var rename   = require('gulp-rename');
var uglify   = require('gulp-uglify');
var download = require('gulp-download');
var gwebpack = require('gulp-webpack');
var webpack  = require('webpack');
var rmrf     = require('spawn-rmrf');
var path     = require('path');
var promise  = require('bluebird');
var pkg      = require('../package.json');
var fs       = promise.promisifyAll(require('fs'));
var rootPath = path.join(__dirname, '..');

var bannerUnitJS = 'Unit.js v'+ pkg.version +
  ' | (c) '+ (new Date().getFullYear()) +' Nicolas Tallefourtane' +
  ' | http://unitjs.com/license.html';


// build unit.js for browser
gulp.task('browser.build', function(done) {

  distClean(function() {
    tmpClean(function() {

      // build browser sources
      buildSrc(function() {

        // run webpack
        buildWebPack(function() {
          buildSinonSrc(function() {

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

  gulp.src('./src/**/*')
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

  gulp.src('unit.js')
    .pipe(gwebpack({
      entry: {
        main: './browser/tmp/src/browser.js'
      },
      output: {
        path: rootPath + '/browser/dist',
        filename: 'unit.js'
      },
      externals: {
        // require('sinon') is external and available
        // on the global var sinon
        'sinon': 'sinon'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            // This has effect on the react lib size
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.IgnorePlugin(/^supertest$/),
        new webpack.IgnorePlugin(/^sinon$/),
        new webpack.IgnorePlugin(/src\/asserters\.js$/),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.BannerPlugin(bannerUnitJS)
      ],
    }))

    .pipe(gulp.dest('./browser/dist'))
    .on('end', done);
}

// build web pack of Unit.js tests
function buildWebPackTests(done) {

  var assertions = [];
  var browserSrc = '';

  gulp.src('./src/assertions.js')
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

      gulp.src([
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

          fs.appendFile(rootPath + '/browser/tmp/test/browser.js', browserSrc,
                        function(err) {

            if (err) {
              throw err;
            }

            gulp.src('tests-unit.js')
              .pipe(gwebpack({
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
                  new webpack.DefinePlugin({
                    'process.env': {
                      // This has effect on the react lib size
                      'NODE_ENV': JSON.stringify('production')
                    }
                  }),
                  new webpack.optimize.DedupePlugin(),
                  new webpack.optimize.UglifyJsPlugin({ mangle: false }),
                  new webpack.BannerPlugin(bannerUnitJS)
                ],
              }))

              .pipe(gulp.dest('./browser/dist'))
              .on('end', done);
          }); // end: appendFile()

        });
    });
}

// Build sinon.js
function buildSinonSrc(done) {

  var sinonVersion = require('sinon/package.json').version;

  download('http://sinonjs.org/releases/sinon-'+ sinonVersion +'.js')
    .pipe(rename({ basename: 'sinon' }))
    .pipe(uglify())
    .pipe(gulp.dest('./browser/tmp/src'))
    .on('end', function() {

      fs.readFileAsync(rootPath + '/browser/tmp/src/sinon.js')
        .then(function(sinon) {

          return {
            sinonjs: '/*! Sinon.JS v'+ sinonVersion +
              ' | (c) '+ (new Date().getFullYear()) +
              ' Christian Johansen (christian@cjohansen.no)' +
              ' | https://github.com/cjohansen/Sinon.JS/blob/master/LICENSE */\n' +
              sinon,
            unitjs: fs.readFileSync(rootPath + '/browser/dist/unit.js')
          };
        })
        .then(function(src) {

          return fs.writeFileAsync(rootPath + '/browser/dist/unit.js',
            '/*! ' + bannerUnitJS + ' */\n' + src.sinonjs + '\n' + src.unitjs);
        })
        .catch(function(err) {
          done(err);
        })

        // task is done
        .finally(done)
        .done()
      ;
    });
}

// replace/copy specific files
function buildToSrc(done) {

  gulp.src('./browser/build/**/*')
    .pipe(gulp.dest('./browser/tmp'))
    .on('end', done);
}

// replace content in the main file
function replaceMainSrc(done) {

  gulp.src('./browser/tmp/src/index.js')
    .pipe(replace(/var supertest\s*=\s*require\('supertest'\);/, ''))
    .pipe(replace(/[\s\n]api\.httpAgent\s*=\s*supertest;?/, ''))
    .pipe(gulp.dest('./browser/tmp/src'))
    .on('end', done);
}

// build src/asserters.js
function buildAssertersSrc(done) {

  fs.readdirAsync(rootPath + '/browser/tmp/src/asserters')

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
    .catch(function(err) {
      done(err);
    })
    // task is done
    .finally(done)
    .done()
  ;
}