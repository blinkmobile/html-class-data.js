'use strict';

// foreign modules

var test = require('tape');

// local modules

var htmlClassData = require('..');

// this module

require('tape-chai');

test('castPropertyTypes', function (t) {

  t.test('is a defined', function (tt) {
    tt.isDefined(htmlClassData);
    tt.end();
  });

});
