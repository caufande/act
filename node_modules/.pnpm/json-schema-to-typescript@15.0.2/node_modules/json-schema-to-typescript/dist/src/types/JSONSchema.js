"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootSchema = exports.Intersection = exports.Types = exports.Parent = void 0;
exports.isBoolean = isBoolean;
exports.isPrimitive = isPrimitive;
exports.isCompound = isCompound;
const lodash_1 = require("lodash");
exports.Parent = Symbol('Parent');
exports.Types = Symbol('Types');
exports.Intersection = Symbol('Intersection');
exports.getRootSchema = (0, lodash_1.memoize)((schema) => {
    const parent = schema[exports.Parent];
    if (!parent) {
        return schema;
    }
    return (0, exports.getRootSchema)(parent);
});
function isBoolean(schema) {
    return schema === true || schema === false;
}
function isPrimitive(schema) {
    return !(0, lodash_1.isPlainObject)(schema);
}
function isCompound(schema) {
    return Array.isArray(schema.type) || 'anyOf' in schema || 'oneOf' in schema;
}
//# sourceMappingURL=JSONSchema.js.map