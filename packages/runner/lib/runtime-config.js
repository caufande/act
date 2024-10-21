/**
 * 运行时环境变量相关
 * @module
 * @license GPL-2.0-or-later
 */

/**@import { CnbConfig } from '@cauact/db' */
import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const Cnb = Type.Object({
	id: Type.String(),
	secret: Type.String(),
	user: Type.String(),
	password: Type.String(),
	blogApp: Type.String(),

	postId: Type.Number(),
});
/**
 * @typedef {Required<CnbConfig> & { postId: number }} Cnb
 */

export const CauactRuntimeConfig = Type.Object({
	cnb: Cnb,
});
/**
 * @typedef {{  cnb: Cnb }} CauactRuntimeConfig
 */

// @ts-ignore
const chk = typeof __CAUACT_RUNTIME__ === 'undefined'
	? JSON.parse(process.env.CAUACT_RUNTIME?.toString() ?? '{}')
	// @ts-ignore
	// eslint-disable-next-line no-undef
	: __CAUACT_RUNTIME__;
Value.Assert(CauactRuntimeConfig, chk);

/**@type {CauactRuntimeConfig} */
export const runtimeConfig = chk;
