'use strict';

// foreign modules

var camelCase = require('lodash.camelcase');

// this module

// https://github.com/angular/angular.js/blob/41b36e68/src/ng/compile.js#L706
var CLASS_REGEXP = /([\w\-]+)(?:\:([^;]+))?;?/g;

/**
* @public
* @param {String} klass contents of an HTML 'class' attribute
* @returns {Object} key-value pairs of properties encoded in the string
*/
function decode (klass) {
  // we intentially mispell "class" to pass ES3 syntax in IE8 and under
  var lastSemicolon = klass.lastIndexOf(';');
  var result = {};
  var matches;
  var key;

  if (lastSemicolon === -1) {
    // no semi-colons, so the whole string is just basic CSS classes
    result['class'] = klass;
    return result;
  }

  result['class'] = klass.substring(lastSemicolon + 1, klass.length).trim();
  klass = klass.substring(0, lastSemicolon + 1);
  klass = klass.replace(/\s/g, '');
  klass = klass.replace(/\:;/g, ';');

  matches = CLASS_REGEXP.exec(klass);
  while (Array.isArray(matches)) {
    key = camelCase(matches[1]);
    if (matches[2] === undefined) {
      result[key] = true;
    } else {
      result[key] = matches[2];
    }
    matches = CLASS_REGEXP.exec(klass);
  }

  return result;
}

module.exports = {
  decode: decode
};
