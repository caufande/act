import { CnbConfig } from '@cauact/db';
import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export const Cnb = Type.Object({
	id: Type.String(),
	secret: Type.String(),

	user: Type.String(),
	password: Type.String(),
	postId: Type.Number(),
	blogApp: Type.String(),
});
interface Cnb extends CnbConfig {
	user: string;
	password: string;
	postId: number;
	blogApp: string;
}

export const CauactRuntimeConfig = Type.Object({
	cnb: Cnb,
});
export interface CauactRuntimeConfig { cnb: Cnb }

Value.Assert(CauactRuntimeConfig, __CAUACT_RUNTIME__);
const runtimeConfig = __CAUACT_RUNTIME__;

export default runtimeConfig;
export const {
	cnb,
} = runtimeConfig;
