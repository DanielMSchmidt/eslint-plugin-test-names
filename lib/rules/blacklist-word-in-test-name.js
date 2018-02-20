/**
 * @fileoverview Blacklists a word in the name of a test
 * @author Daniel Schmidt
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Blacklists a word in the name of a test",
      category: "Fill me in",
      recommended: false
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: {
          words: {
            type: "array",
            items: {
              type: "string",
              minItems: 1,
              uniqueItems: true
            }
          },
          caseInsensitive: {
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: function(context) {
    const blacklistedWords = context.options[0].words;
    const caseInsensitive = context.options[0].caseInsensitive || false;

    function matchWord(term, blacklistedWord) {
      const searchWord = caseInsensitive
        ? blacklistedWord.toUpperCase()
        : blacklistedWord;
      const searchedTerm = caseInsensitive ? term.toUpperCase() : term;

      return searchedTerm.indexOf(searchWord) !== -1;
    }

    return {
      // give me methods
      CallExpression(node) {
        if (
          node.callee.name === "it" &&
          node.arguments &&
          node.arguments.length &&
          node.arguments[0].value &&
          blacklistedWords.some(matchWord.bind(null, node.arguments[0].value))
        ) {
          const blacklistedWord = blacklistedWords.find(
            matchWord.bind(null, node.arguments[0].value)
          );

          context.report({
            node,
            message:
              "test name must not have the word '{{description}}' in it.",
            data: {
              description: blacklistedWord
            }
          });
        }
      }
    };
  }
};
