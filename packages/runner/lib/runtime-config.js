import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
const Cnb = Type.Object({
    id: Type.String(),
    secret: Type.String(),
    user: Type.String(),
    password: Type.String(),
    blogApp: Type.String(),
    actPostId: Type.Number(),
    groupsPostId: Type.Number(),
});
export const CauactRuntimeConfig = Type.Object({
    cnb: Cnb,
});
// @ts-ignore
const chk = typeof __CAUACT_RUNTIME__ === 'undefined'
    ? JSON.parse(process.env.CAUACT_RUNTIME?.toString() ?? '{}')
    // @ts-ignore
    : __CAUACT_RUNTIME__;
Value.Assert(CauactRuntimeConfig, chk);
export const runtimeConfig = chk;
