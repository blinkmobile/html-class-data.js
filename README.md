# html-class-data.js

encode / decode data stored in an HTML class attribute (like Angular)

[![npm module](https://img.shields.io/npm/v/@blinkmobile/html-class-data.svg)](https://www.npmjs.com/package/@blinkmobile/html-class-data)
[![travis-ci](https://img.shields.io/travis/blinkmobile/html-class-data.js.svg)](https://travis-ci.org/blinkmobile/html-class-data.js)


## What is this?

It may be convenient to encode values within an HTML class attribute, just like
the CSS syntax for Angular directives. We provide a helper function to decode
such attributes.


## API

We export an Object with the following function(s)...


### `decode()`

- @param {String} class contents of an HTML 'class' attribute
- @returns {Object} key-value pairs of properties encoded in the string

The returned Object will always have a "class" property, with a String value
containing any non-Setting content (i.e. actual CSS classes). We consider
everything after the last semi-colon to be CSS classes.

If there is no semi-colon at all, then we treat the whole string as a normal CSS
class. For example, `cat dog` becomes:

```json
{
  "class": "cat dog"
}
```


Inspired by HTML attributes, we consider any Setting that does not have an
explicit value to be a Boolean Setting, with a default `true` value.

For example, `cat; dog` becomes:

```json
{
  "class": "dog",
  "cat": true
}
```

Use semi-colons to delimit Settings, and use colons to delimit Setting key-value
pairs. We ignore spaces when parsing Settings.

For example, `cats: rule; dogs: drool;` becomes:

```json
{
  "class": "",
  "cats": "rule",
  "dogs": "drool"
}
```

For multi-word Setting names, follow CSS conventions by using lower-case
kebab-style. We convert this to camelCase automatically to follow JavaScript
conventions.

For example, `multi-word: value;` becomes:

```json
{
  "class": "",
  "multiWord": "value"
}
```
