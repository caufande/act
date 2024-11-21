import { Type } from '@sinclair/typebox';
import { throwError } from '../errors';
import { Value } from '@sinclair/typebox/value';
export const Group = Type.Object({
    dads: Type.Array(Type.String()),
    tags: Type.Array(Type.String()),
    hash: Type.Union([Type.Null(), Type.String()]),
});
Value.Create(Group);
export var ArraySpliter;
(function (ArraySpliter) {
    ArraySpliter["First"] = ",";
    ArraySpliter["Second"] = "|";
})(ArraySpliter || (ArraySpliter = {}));
;
function parseSecArr(text) {
    return text ? text.split(ArraySpliter.Second) : [];
}
export default class Groups extends Map {
    static assert(n) {
        if (!(n instanceof Map))
            throw Error('not map', { cause: n });
        n.forEach((v, k) => {
            Value.Assert(Type.String(), k);
            Value.Assert(Group, v);
        });
    }
    static serializer(n) {
        return Array.from(n).map(([name, { dads, tags, hash }]) => [name, dads, tags, hash]);
    }
    static deserializer(n) {
        const groups = new Groups();
        n.forEach(([name, dads, tags, hash]) => groups.set(name, { dads, tags, hash }));
        return groups;
    }
    constructor(sheet = null) {
        super();
        if (sheet !== null)
            this.parse(sheet);
    }
    parse(sheet) {
        sheet.split('\n').forEach((line, idx) => line && this.parseLine(line, idx + 1));
    }
    parseLine(line, lineNumber) {
        const blocks = line.split(ArraySpliter.First);
        if (blocks.length !== 4) {
            throwError('WrongInfoNumberOfGroupLine', { number: blocks.length, line, lineNumber });
        }
        const [name, dadsStr, tagsStr, hash] = blocks;
        const group = {
            dads: parseSecArr(dadsStr),
            tags: parseSecArr(tagsStr),
            hash: hash ? hash : null,
        };
        this.set(name, group);
    }
}
