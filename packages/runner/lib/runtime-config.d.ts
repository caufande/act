/**
 * 运行时环境变量相关
 * @license GPL-2.0-or-later
 */
declare module './runtime-config';
import { CnbConfig } from '@cauact/db';
declare const Cnb: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
    secret: import("@sinclair/typebox").TString;
    user: import("@sinclair/typebox").TString;
    password: import("@sinclair/typebox").TString;
    blogApp: import("@sinclair/typebox").TString;
    postId: import("@sinclair/typebox").TNumber;
}>;
interface Cnb extends Required<CnbConfig> {
    postId: number;
}
export declare const CauactRuntimeConfig: import("@sinclair/typebox").TObject<{
    cnb: import("@sinclair/typebox").TObject<{
        id: import("@sinclair/typebox").TString;
        secret: import("@sinclair/typebox").TString;
        user: import("@sinclair/typebox").TString;
        password: import("@sinclair/typebox").TString;
        blogApp: import("@sinclair/typebox").TString;
        postId: import("@sinclair/typebox").TNumber;
    }>;
}>;
export interface CauactRuntimeConfig {
    cnb: Cnb;
}
export declare const runtimeConfig: CauactRuntimeConfig;
export {};
