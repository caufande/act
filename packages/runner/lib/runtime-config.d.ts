export type CauactRuntimeConfig = {
    cnb: Cnb;
};
/**
 * @typedef {Required<CnbConfig> & { postId: number }} Cnb
 */
export const CauactRuntimeConfig: import("@sinclair/typebox").TObject<{
    cnb: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        secret: import("@sinclair/typebox").TString;
        user: import("@sinclair/typebox").TString;
        password: import("@sinclair/typebox").TString;
        blogApp: import("@sinclair/typebox").TString;
        postId: import("@sinclair/typebox").TNumber;
    }>;
}>;
/**@type {CauactRuntimeConfig} */
export const runtimeConfig: CauactRuntimeConfig;
export type Cnb = Required<CnbConfig> & {
    postId: number;
};
import type { CnbConfig } from '@cauact/db';
