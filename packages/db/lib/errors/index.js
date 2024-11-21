import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { errorDefs, message } from './defs';
import { getTip } from './names';
export function throwError(errorType, infos) {
    Value.Assert(Type.Object(errorDefs[errorType]), infos);
    if (Value.Check(Type.Object({ message }), infos)) {
        console.error(infos.message);
    }
    throw [errorType, getTip(errorType), infos];
}
