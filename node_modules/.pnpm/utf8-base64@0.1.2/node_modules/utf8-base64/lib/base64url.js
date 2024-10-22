/**
* @license UTF-8 and Base64 and Base64url Javascript Encoding Module
* (c) Vassilis Petroulias [DRDigit], Leonid Zolotarev
* License: Apache-2.0
*/

'use strict';

var B64url = {
    decode: function (input) {
        // Replace non-url compatible chars with base64 standard chars
        input = input
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        // Pad out with standard base64 required padding characters
        var pad = input.length % 4;
        if (pad) {
            if (pad === 1) {
                throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
            }
            input += new Array(5 - pad).join('=');
        }

        return B64.decode(input);
    },

    encode: function (input) {
        var output = B64.encode(input);
        return output
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .split('=', 1)[0];
    }
};

module.exports = B64url;
