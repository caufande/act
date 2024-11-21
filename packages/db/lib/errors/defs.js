import { Any, Enum, Number, String } from '@sinclair/typebox';
import { CheckingType } from '../Operator';
export const message = String();
export const errorDefs = {
    NoTitle: {
        floor: Number(),
    },
    WrongBigTitle: {
        floor: Number(),
    },
    TooManyDatesInACommentLine: {
        floor: Number(),
        line: String(),
    },
    NoComment: {
        floor: Number(),
    },
    NoUser: {
        cnbConfig: Any(),
    },
    NoPassword: {
        cnbConfig: Any(),
    },
    NoClientId: {
        cnbConfig: Any(),
    },
    NoClientSecret: {
        cnbConfig: Any(),
    },
    ActParsingError: {
        message,
    },
    GroupsPostFormatError: {
        content: String(),
    },
    WrongInfoNumberOfGroupLine: {
        line: String(),
        number: Number(),
        lineNumber: Number(),
    },
    CannotParseGroupExpr: {
        message,
        interval: Any(),
    },
    NoAsserter: {
        checkingType: Enum(CheckingType),
    },
};
