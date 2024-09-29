interface Cnb {
	id: string;
	secret: string;
}

export interface CauactRuntimeConfig { cnb: Cnb }

// @ts-ignore
const runtimeConfig = __CAUACT_RUNTIME__ as CauactRuntimeConfig;
export default runtimeConfig;
