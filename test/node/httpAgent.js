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

var test  = require('../../src');
var http  = require('http');
var url   = require('url');

describe('supertest library to as httpAgent', function() {

  var server;
  var indicator;

  before(function() {

    // init indicator
    indicator = test.createCollection({
      home_page: false,
      some_page: false
    });

    // create a server
    server = http.createServer(function(req, res) {

      var page = url.parse(req.url).pathname;

      var writeHead = function(code) {

        res.writeHead(code, {
          'Content-Type': 'text/plain',
          'x-powered-by': 'unit.js'
        });
      };

      if (page == '/') {
        indicator.set('home_page', true);
        writeHead(200);
        res.write('home page');

      }else if (page == '/some') {
        indicator.set('some_page', true);
        writeHead(200);
        res.write('some page');
      }else{
        writeHead(404);
        res.write('404 not found');
      }

      res.end();
    });

    server.listen(0);
  });


  it('Good request', function() {

    var testServer;

    test
      .given('Create a server asserter', function(){

        testServer = function(name){

          test.bool(indicator.get(name + '_page')).isFalse();

          // async queue
          test.promise.resolve()
            .then(function(){
              return test.httpAgent(server).get('/' + (name == 'home' ? '' : name));
            })
            .then(function(request){
              request
                .expect(200, name + ' page')
                .expect('x-powered-by', 'unit.js')
                .expect('Content-Type', /text/)

                .end(function(err, res){
                  test
                    .bool(indicator.get(name + '_page'))
                      .isTrue()

                    .value(err)
                      .isFalsy()

                    .string(res.text)
                      .isIdenticalTo(name + ' page')
                  ;
                })
              ;
            })
            .catch(function(err) {
              throw err;
            })
            .done()
          ;
        };
      })

      .then('Test the server: "/"', function(){
        testServer('home');
      })

      .then('Test the server: "/some"', function(){
        testServer('some');
      })
    ;
  });

  it('Bad request', function(done) {

    test.httpAgent(server)
      .get('/bad')
      .expect(200)
      .end(function(err, res){

        test.object(err).isInstanceOf(Error);

        done();
      })
    ;
  });

  it('Bad content', function(done) {

    test.httpAgent(server)
      .get('/')
      .expect(200, 'bad content')
      .end(function(err, res){

        test.object(err).isInstanceOf(Error);

        done();
      });
  });
});
