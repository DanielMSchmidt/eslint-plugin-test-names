/**
 * @fileoverview Blacklists a word in the name of a test
 * @author Daniel Schmidt
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/blacklist-word-in-test-name"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("blacklist-word-in-test-name", rule, {

    valid: [
        {
            code: "it(\"does XYZ\")",
            options: ["should"]
        },
        {
            code: "otherCall(\"does XYZ\")",
            options: ["should"]
        },
        {
            code: "it(\"should do XYZ\")",
            options: ["otherWord"]
        }
    ],

    invalid: [
        {
            code: "it(\"should do XYZ\")",
            options: ["should"],
            errors: [{
                message: "test name must not have the word 'should' in it.",
                type: "CallExpression"
            }]
        }
    ]
});
