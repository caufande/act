interface Position {
    index: number;
    column: number;
    line: number;
}
interface Token {
    type: string;
    content?: string;
    position?: {
        start?: Position;
        end?: Position;
    };
    close?: boolean;
}
declare class Scaner {
    private tokens;
    private position;
    private html;
    constructor(html: string);
    scan(): Token[];
    private scanText;
    private scanComment;
    private scanTag;
    private scanTagStart;
    private scanTagEnd;
    private scanTagName;
    private scanAttrs;
    private scanSkipTag;
}
export { Token, Scaner };
