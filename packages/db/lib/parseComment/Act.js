import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import { throwError } from '../errors';
import { parse } from './act-parser';
import { GroupExpr } from './groupExpr';
export const Stage = Type.Object({
    name: Type.String(),
    timeSteps: Type.Array(Type.Tuple([Type.Date(), Type.Date()])),
    details: Type.Array(Type.String()),
    partition: Type.Union([Type.Null(), GroupExpr]),
});
Value.Create(Stage);
export const Detail = Type.Object({
    title: Type.String(),
    strings: Type.Array(Type.String()),
    details: Type.Any(),
});
Detail.properties.details = Type.Array(Detail);
Value.Create(Detail);
export const ActParsed = Type.Object({
    title: Type.String(),
    detail: Detail,
    groupExpr: GroupExpr,
    stages: Type.Array(Stage),
});
Value.Create(ActParsed);
/**
 * 项目具体数据
 */
export default class Act {
    static tSchema = Type.Composite([ActParsed, Type.Object({
            floor: Type.Number(),
            id: Type.Number(),
            author: Type.String(),
            authorUrl: Type.String(),
        })]);
    static _ = Value.Create(Act.tSchema);
    static assert(n) {
        Value.Assert(Act.tSchema, n);
    }
    static deserializer(n) {
        const a = n;
        a.stages.forEach(n => n.timeSteps = n.timeSteps.map(([a, b]) => [new Date(a), new Date(b)]));
        return n;
    }
    static ParserError = Type.Object({
        format: Type.Function([
            Type.Array(Type.Object({
                source: Type.String(),
                text: Type.String(),
            })),
        ], Type.String()),
    });
    static isParserError(n) {
        return Value.Check(Act.ParserError, n);
    }
    title;
    detail;
    /**
     * 活动具体内容
     *
     * @minItems 1
     */
    stages;
    groupExpr;
    floor;
    id;
    author;
    authorUrl;
    constructor({ floor, id, author, authorUrl, body }) {
        const fileName = `第 ${floor} 层评论`;
        try {
            const actParsed = parse(body, { grammarSource: fileName, floor });
            actParsed.floor = floor;
            actParsed.id = id;
            actParsed.author = author;
            actParsed.authorUrl = authorUrl;
            return actParsed;
        }
        catch (err) {
            if (!Act.isParserError(err))
                throw err;
            throwError('ActParsingError', {
                message: err.format([
                    { source: fileName, text: body },
                ]),
            });
        }
    }
}
