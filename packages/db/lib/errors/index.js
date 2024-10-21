import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { errorDefs } from './defs';
import { getTip } from './names';
export function throwError(errorType, infos) {
    Value.Assert(Type.Object(errorDefs[errorType]), infos);
    throw [getTip(errorType), infos];
}
