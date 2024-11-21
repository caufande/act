"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.info = exports.error = exports.dim = exports.bold = void 0;
const tty_1 = require("tty");
let errorTag;
let infoTag;
let warnTag;
const error = (...args) => console.error(errorTag, ...args);
exports.error = error;
const info = (...args) => console.log(infoTag, ...args);
exports.info = info;
const warn = (...args) => console.warn(warnTag, ...args);
exports.warn = warn;
if (tty_1.WriteStream.prototype.hasColors() && process.env["NODE_ENV"] !== "test") {
    errorTag = "\u001B[31m\u001B[1merror\u001B[22m\u001B[39m";
    infoTag = "\u001B[36m\u001B[1minfo\u001B[22m\u001B[39m";
    warnTag = "\u001B[33m\u001B[1mwarn\u001B[22m\u001B[39m";
    exports.bold = (s) => "\u001B[1m" + s + "\u001B[22m";
    exports.dim = (s) => "\u001B[2m" + s + "\u001B[22m";
}
else {
    errorTag = "error";
    infoTag = "info";
    warnTag = "warn";
    exports.bold = (s) => s;
    exports.dim = exports.bold;
}
//# sourceMappingURL=index.js.map