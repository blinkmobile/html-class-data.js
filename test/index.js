'use strict';

// foreign modules

var test = require('tape');

// local modules

var htmlClassData = require('..');

// this module

require('tape-chai');

test('htmlClassData', function (t) {

  t.test('is an Object', function (tt) {
    tt.isObject(htmlClassData);
    tt.end();
  });

});

test('htmlClassData.decode', function (t) {

  t.test('is a Function', function (tt) {
    tt.isFunction(htmlClassData.decode);
    tt.end();
  });

});

test('decoding strings', function (t) {
  var fixtures;
  var classes;
  var keys;
  var values;

  fixtures = [
    'cat',
    'cat dog',
    'bird cat dog',
    'bird: cat; dog',
    'bird; cat dog',
    'bird; cat:; dog',
    'bird-cat; dog',
    'bird-cat: dog;'
  ];
  classes = [
    'cat',
    'cat dog',
    'bird cat dog',
    'dog',
    'cat dog',
    'dog',
    'dog',
    ''
  ];
  keys = [
    [ 'class' ],
    [ 'class' ],
    [ 'class' ],
    [ 'class', 'bird' ],
    [ 'class', 'bird' ],
    [ 'class', 'bird', 'cat' ],
    [ 'class', 'birdCat' ],
    [ 'class', 'birdCat' ]
  ];
  values = [ // [0] is not checked, as we have separate class tests
    [ null ],
    [ null ],
    [ null ],
    [ null, 'cat' ],
    [ null, true ],
    [ null, true, true ],
    [ null, true ],
    [ null, 'dog' ]
  ];

  t.test('result has expected CSS class(es)', function (tt) {
    var i = fixtures.length;
    var result;
    while (i > 0) {
      i -= 1;
      result = htmlClassData.decode(fixtures[i]);
      tt.isObject(result);
      tt.property(result, 'class');
      tt.equal(result['class'], classes[i]);
    }
    tt.end();
  });

  t.test('result Object has expected keys', function (tt) {
    var i = fixtures.length;
    var result;
    while (i > 0) {
      i -= 1;
      result = htmlClassData.decode(fixtures[i]);
      tt.isObject(result);
      tt.sameMembers(
        Object.keys(result), keys[i],
        fixtures[i] + ' => Object.keys(' + JSON.stringify(result) + ') != ' + JSON.stringify(keys[i])
      );
    }
    tt.end();
  });

  t.test('result Object has expected values', function (tt) {
    var i = fixtures.length;
    var j;
    var result;
    while (i > 0) {
      i -= 1;
      result = htmlClassData.decode(fixtures[i]);
      tt.isObject(result);
      j = keys[i].length;
      while (j > 1) { // skip [0] because we have separate class tests
        j -= 1;
        tt.property(
          result,
          keys[i][j],
          JSON.stringify(fixtures[i]) + ' has property ' + keys[i][j]
        );
        tt.equal(result[keys[i][j]], values[i][j], JSON.stringify(result));
      }
    }
    tt.end();
  });

  t.end();
});
