import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { throwError } from '../errors';
import groupArrxprGramm from './group-expr.ohm-bundle.cjs';
export var Operation;
(function (Operation) {
    Operation[Operation["And"] = 0] = "And";
    Operation[Operation["Or"] = 1] = "Or";
    Operation[Operation["Not"] = 2] = "Not";
})(Operation || (Operation = {}));
export const GroupExpr = Type.Union([Type.String(), Type.Any(), Type.Any()]);
const BinOperationArr = Type.Tuple([Type.Enum(Operation), GroupExpr, GroupExpr]);
const NotArr = Type.Tuple([Type.Enum(Operation), GroupExpr]);
GroupExpr.anyOf[1] = BinOperationArr;
GroupExpr.anyOf[2] = NotArr;
export function assertGroupExpr(n) {
    return Value.Assert(GroupExpr, n);
}
function resOpArr(op, arr) {
    const n = arr.pop();
    if (arr.length === 0)
        return n.getTester();
    return [op, n.getTester(), resOpArr(op, arr)];
}
const parseOpObj = {
    ExprOr(a, _, c) {
        return resOpArr(Operation.Or, [a, ...c.children]);
    },
    ExprAnd(a, _, c) {
        return resOpArr(Operation.And, [a, ...c.children]);
    },
    Quoted(_a, n, _b) {
        return n.getTester();
    },
    Term_not(_, n) {
        return [Operation.Not, n.getTester()];
    },
    groupName(n) {
        return n.sourceString;
    },
};
const groupExprSemantics = groupArrxprGramm.createSemantics();
groupExprSemantics.addOperation('getTester', parseOpObj);
export default function getGroupExpr(n) {
    if (typeof n !== 'string')
        n = '(' + n.join(')|(') + ')';
    const matched = groupArrxprGramm.match(n);
    if (matched.failed())
        throwError('CannotParseGroupExpr', { interval: matched.getInterval(), message: matched.message });
    return groupExprSemantics(matched).getTester();
}
