# eslint-plugin-test-names [![Build Status](https://travis-ci.org/DanielMSchmidt/eslint-plugin-test-names.svg?branch=master)](https://travis-ci.org/DanielMSchmidt/eslint-plugin-test-names)

Validates if the test names don't contain a certain set of words

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-test-names`:

```
$ npm install eslint-plugin-test-names --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-test-names` globally.

## Usage

Add `test-names` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["test-names"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "test-names/blacklist-word-in-test-name": [
      2,
      { words: ["should", "needs to"], caseInsensitive: true }
    ]
  }
}
```

## Supported Rules

* `blacklist-word-in-test-name`: Blacklists a word in the name of a test
