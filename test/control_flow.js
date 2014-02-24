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

var test = require('../');

describe('Control flow', function(){

	describe('Performs the tests without entangled with the flow of ' +
		'other series of tests', function(){

		it('Series launched in chaining', function(){

			test
				.exception(function(){ 
					test
						.string('serie1-1')
							.isEqualTo('serie1-1')

						.string('serie1-2')
							.isEqualTo('serie1-2')

						.string('serie1-3')
							.isEqualTo('serie1-3')
					;

					throw new Error('Whoops1-1 !');

				})
				.hasMessage('Whoops1-1 !')
				.hasMessage(/Whoop/)

				.string('serie2-1')
		  			.isEqualTo('serie2-1')

				.exception(function(){ 
					test
						.string('serie2-1')
							.isEqualTo('serie2-1')

						.string('serie2-2')
							.isEqualTo('serie2-2')

						.string('serie2-3')
							.isEqualTo('serie2-3')
					;

					throw new Error('Whoops2-1 !');
				})
				.hasMessage('Whoops2-1 !')
				.hasMessage(/Whoop/)

		  		.string('serie3-1')
		  			.isEqualTo('serie3-1')

				.exception(function(){ throw new Error('Whoops3-1 !')})
					.hasMessage('Whoops3-1 !')

		  		.string('serie4-1')
		  			.isEqualTo('serie4-1')

				.exception(function(){ throw new Error('Whoops4-1 !')})
					.hasMessage('Whoops4-1 !')

				.string('serie5-1')
					.isEqualTo('serie5-1')

				.string('serie5-2')
					.isEqualTo('serie5-2')

				.string('serie5-3')
					.isEqualTo('serie5-3')
				
				.then()
					.string('serie5-4')
						.isEqualTo('serie5-4')
			;
		});

		it('Series launched without chaining', function(){

			test
				.exception(function(){ 
					test.string('serie1-1').isEqualTo('serie1-1');

					test.string('serie1-2').isEqualTo('serie1-2');

					test.string('serie1-3').isEqualTo('serie1-3');

					throw new Error('Whoops1-1 !');
				})
				.hasMessage('Whoops1-1 !')
				.hasMessage(/Whoop/)
			;

			test.string('serie2-1').isEqualTo('serie2-1');

			test
				.exception(function(){ 
					test.string('serie2-1').isEqualTo('serie2-1');

					test.string('serie2-2').isEqualTo('serie2-2');

					test.string('serie2-3').isEqualTo('serie2-3');

					throw new Error('Whoops2-1 !');
				})
				.hasMessage('Whoops2-1 !')
				.hasMessage(/Whoop/)
			;

		  test.string('serie3-1').isEqualTo('serie3-1');

			test.exception(function(){ 
				throw new Error('Whoops3-1 !');
			})
			.hasMessage('Whoops3-1 !');

		  test.string('serie4-1').isEqualTo('serie4-1');

			test.exception(function(){ 
				throw new Error('Whoops4-1 !');
			})
			.hasMessage('Whoops4-1 !');

			test.string('serie5-1').isEqualTo('serie5-1');

			test.string('serie5-2').isEqualTo('serie5-2');

			test.string('serie5-3').isEqualTo('serie5-3');
				
			test.string('serie5-4').isEqualTo('serie5-4');
		});

		it('Series with helpers', function(){

			var str;
			var indicator;

			test
				.given(str = 'serie1-1')

				.string(str)
					.isEqualTo('serie1-1')

				.when('change "str" value', function(){
					str = 'serie1-2';
				})

				.then(function(){
					indicator = true;

					test.string(str).isEqualTo('serie1-2');
				})

				.then('Checks that "then" execute the function argument')

				.bool(indicator)
					.isTrue()
			;
		});
	});
});