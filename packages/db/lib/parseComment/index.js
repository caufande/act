import getGroupExpr from './groupExpr';
import Act from './Act';
import { Value } from '@sinclair/typebox/value';
export * from './Act';
export * from './groupExpr';
export { Act, getGroupExpr };
export default function parseComment(comment, option = {}) {
    const { check = false, } = option;
    const act = new Act(comment);
    if (check)
        Value.Assert(Act.tSchema, act);
    return act;
}
