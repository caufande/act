/**
 * 运行时环境变量相关
 * @license GPL-2.0-or-later
 */
declare module './runtime-config';

import { CnbConfig } from '@cauact/db';
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
interface Cnb extends Required<CnbConfig> {
	actPostId: number;
	groupsPostId: number;
}

export const CauactRuntimeConfig = Type.Object({
	cnb: Cnb,
});
export interface CauactRuntimeConfig { cnb: Cnb }

// @ts-ignore
const chk: unknown = typeof __CAUACT_RUNTIME__ as any === 'undefined'
	? JSON.parse(process.env.CAUACT_RUNTIME?.toString() ?? '{}')
	// @ts-ignore
	: __CAUACT_RUNTIME__ as any;
Value.Assert(CauactRuntimeConfig, chk);

export const runtimeConfig: CauactRuntimeConfig = chk;
