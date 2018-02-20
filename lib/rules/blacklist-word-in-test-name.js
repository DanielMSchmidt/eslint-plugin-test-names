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
            },
            uniqueItems: true
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: function(context) {
    const blacklistedWords = context.options[0].words;

    return {
      // give me methods
      CallExpression(node) {
        if (
          node.callee.name === "it" &&
          node.arguments &&
          node.arguments.length &&
          node.arguments[0].value &&
          blacklistedWords.some(function(blacklistedWord) {
            return node.arguments[0].value.indexOf(blacklistedWord) !== -1;
          })
        ) {
          const blacklistedWord = blacklistedWords.find(function(
            blacklistedWord
          ) {
            return node.arguments[0].value.indexOf(blacklistedWord) !== -1;
          });

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
