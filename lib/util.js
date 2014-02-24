/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     utils.merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

exports.chain = function(fn) {

  fn.apply 		= fn.apply;
  fn.bind 		= fn.bind;
  fn.call 		= fn.call;
  fn.name 		= fn.name;
  fn.toString 	= fn.toString;
  fn.__proto__ 	= this;

  return fn;
};