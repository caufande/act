import { Type } from '@sinclair/typebox';
export const errorDefs = {
    NoTitle: {
        floor: Type.Number(),
    },
    WrongBigTitle: {
        floor: Type.Number(),
    },
    TooManyDatesInACommentLine: {
        floor: Type.Number(),
        line: Type.String(),
    },
};
