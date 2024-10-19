import { CnbConfig } from '@cauact/db';

interface Cnb extends CnbConfig {
	postId: number;
	blogApp: string;
}

export interface CauactRuntimeConfig { cnb: Cnb }

// @ts-ignore
const runtimeConfig = __CAUACT_RUNTIME__ as CauactRuntimeConfig;
export default runtimeConfig;
export const {
	cnb,
} = runtimeConfig;
