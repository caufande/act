import { Any, Number, String } from '@sinclair/typebox';
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
};
