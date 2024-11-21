"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeUrlMechanisms = exports.getUrlFromDocument = exports.getGenericImportMetaMechanism = exports.getResolveUrl = void 0;
const _1 = require(".");
/*
  The following functions are copied from rollup
  https://github.com/rollup/rollup/blob/0bcf0a672ac087ff2eb88fbba45ec62389a4f45f/src/ast/nodes/MetaProperty.ts#L145-L193

  https://github.com/rollup/rollup
  The MIT License (MIT)
  Copyright (c) 2017 [these people](https://github.com/rollup/rollup/graphs/contributors)
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
const getResolveUrl = (path, URL = 'URL') => `new ${URL}(${path}).href`;
exports.getResolveUrl = getResolveUrl;
const getRelativeUrlFromDocument = (relativePath, umd = false) => (0, exports.getResolveUrl)(`'${(0, _1.escapeId)(relativePath)}', ${umd ? `typeof document === 'undefined' ? location.href : ` : ''}document.currentScript && document.currentScript.src || document.baseURI`);
const getGenericImportMetaMechanism = (getUrl) => (property, { chunkId }) => {
    const urlMechanism = getUrl(chunkId);
    return property === null
        ? `({ url: ${urlMechanism} })`
        : property === 'url'
            ? urlMechanism
            : 'undefined';
};
exports.getGenericImportMetaMechanism = getGenericImportMetaMechanism;
const getFileUrlFromFullPath = (path) => `require('u' + 'rl').pathToFileURL(${path}).href`;
const getFileUrlFromRelativePath = (path) => getFileUrlFromFullPath(`__dirname + '/${path}'`);
const getUrlFromDocument = (chunkId, umd = false) => `${umd ? `typeof document === 'undefined' ? location.href : ` : ''}(document.currentScript && document.currentScript.src || new URL('${(0, _1.escapeId)(chunkId)}', document.baseURI).href)`;
exports.getUrlFromDocument = getUrlFromDocument;
exports.relativeUrlMechanisms = {
    amd: relativePath => {
        if (relativePath[0] !== '.')
            relativePath = './' + relativePath;
        return (0, exports.getResolveUrl)(`require.toUrl('${relativePath}'), document.baseURI`);
    },
    cjs: relativePath => `(typeof document === 'undefined' ? ${getFileUrlFromRelativePath(relativePath)} : ${getRelativeUrlFromDocument(relativePath)})`,
    es: relativePath => (0, exports.getResolveUrl)(`'${relativePath}', import.meta.url`),
    iife: relativePath => getRelativeUrlFromDocument(relativePath),
    system: relativePath => (0, exports.getResolveUrl)(`'${relativePath}', module.meta.url`),
    umd: relativePath => `(typeof document === 'undefined' && typeof location === 'undefined' ? ${getFileUrlFromRelativePath(relativePath)} : ${getRelativeUrlFromDocument(relativePath, true)})`
};
//# sourceMappingURL=rollup.js.map