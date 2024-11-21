/**
 * 错误定义
 * @license AGPL-3.0-or-later
 */
declare module './defs';
import { TSchema, TString } from '@sinclair/typebox';
import { CheckingType } from '../Operator';
export declare const message: TString;
export type ErrorDefs = Record<string, Record<string, TSchema> & {
    message?: TString;
}>;
export declare const errorDefs: {
    NoTitle: {
        floor: import("@sinclair/typebox").TNumber;
    };
    WrongBigTitle: {
        floor: import("@sinclair/typebox").TNumber;
    };
    TooManyDatesInACommentLine: {
        floor: import("@sinclair/typebox").TNumber;
        line: TString;
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
    ActParsingError: {
        message: TString;
    };
    GroupsPostFormatError: {
        content: TString;
    };
    WrongInfoNumberOfGroupLine: {
        line: TString;
        number: import("@sinclair/typebox").TNumber;
        lineNumber: import("@sinclair/typebox").TNumber;
    };
    CannotParseGroupExpr: {
        message: TString;
        interval: import("@sinclair/typebox").TAny;
    };
    NoAsserter: {
        checkingType: import("@sinclair/typebox").TEnum<typeof CheckingType>;
    };
};
