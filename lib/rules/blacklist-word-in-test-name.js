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
                type: "string"
            }
        ]
    },

    create: function(context) {
        const blacklistedWord = context.options[0];

        return {

            // give me methods
            CallExpression(node) {
                if(node.callee.name === "it" && node.arguments && node.arguments.length && node.arguments[0].value && node.arguments[0].value.indexOf(blacklistedWord) !== -1) {
                    context.report({
                        node,
                        message: "test name must not have the word '{{description}}' in it.",
                        data: {
                            description: blacklistedWord
                        }
                    });
                }
            }
        };
    }
};
