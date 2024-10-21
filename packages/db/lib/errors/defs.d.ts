/**
 * 错误定义
 * @license GPL-2.0-or-later
 */
declare module './defs';
import { TSchema } from '@sinclair/typebox';
export type ErrorDefs = Record<string, Record<string, TSchema>>;
export declare const errorDefs: {
    NoTitle: {
        floor: import("@sinclair/typebox").TNumber;
    };
    WrongBigTitle: {
        floor: import("@sinclair/typebox").TNumber;
    };
    TooManyDatesInACommentLine: {
        floor: import("@sinclair/typebox").TNumber;
        line: import("@sinclair/typebox").TString;
    };
    NoComment: {
        floor: import("@sinclair/typebox").TNumber;
    };
    NoUser: {
        cnbConfig: import("@sinclair/typebox").TAny;
    };
    NoPassword: {
        cnbConfig: import("@sinclair/typebox").TAny;
    };
    NoClientId: {
        cnbConfig: import("@sinclair/typebox").TAny;
    };
    NoClientSecret: {
        cnbConfig: import("@sinclair/typebox").TAny;
    };
};
