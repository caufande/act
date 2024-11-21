/**
 * 博客 API 相关
 * @license AGPL-3.0-or-later
 */
declare module '.';
import { Static } from '@sinclair/typebox';
import { IncomingHttpHeaders, Requester } from '../Operator';
import CommentGetter from './CommentGetter';
export * from './CommentGetter';
export { CommentGetter };
export interface CnbConfig {
    id?: string;
    secret?: string;
    user?: string;
    password?: string;
    blogApp?: string;
}
declare const CommentOrigin: import("@sinclair/typebox").TObject<{
    Id: import("@sinclair/typebox").TNumber;
    Body: import("@sinclair/typebox").TString;
    Author: import("@sinclair/typebox").TString;
    AuthorUrl: import("@sinclair/typebox").TString;
    FaceUrl: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>;
    Floor: import("@sinclair/typebox").TNumber;
    DateAdded: import("@sinclair/typebox").TString;
}>;
export type CommentOrigin = Static<typeof CommentOrigin>;
export declare namespace Post {
    interface Enclosure {
        length?: number;
        type?: string;
        url?: string;
    }
    interface Source {
        name?: string;
        url?: string;
    }
}
export interface Post {
    description: string;
    title: string;
    dateCreated?: Date;
    categories?: readonly string[];
    enclosure?: Post.Enclosure;
    link?: string;
    permalink?: string;
    postid?: number;
    source?: Post.Source;
    userid?: string;
    mt_allow_comments?: any;
    mt_allow_pings?: any;
    mt_convert_breaks?: any;
    mt_text_mote?: string;
    mt_excerpt?: string;
    mt_keywords?: string;
    wp_slug?: string;
}
export default class CnbApi {
    config: CnbConfig;
    protected static readonly XmlSuccess: import("@sinclair/typebox").TObject<{
        name: import("@sinclair/typebox").TLiteral<string>;
        children: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
            name: import("@sinclair/typebox").TLiteral<string>;
            children: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                name: import("@sinclair/typebox").TLiteral<string>;
                children: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                    name: import("@sinclair/typebox").TLiteral<string>;
                    children: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TObject<{
                        name: import("@sinclair/typebox").TLiteral<string>;
                        value: import("@sinclair/typebox").TLiteral<string>;
                    }>>;
                }>>;
            }>>;
        }>>;
    }>;
    protected readonly requester: Requester;
    constructor(config: CnbConfig);
    static readonly baseApiHeader: IncomingHttpHeaders;
    protected getApiHeader(header?: IncomingHttpHeaders): Promise<IncomingHttpHeaders>;
    private expiresDate;
    private authorizationStr;
    protected login(): Promise<string>;
    getPost(postId: number): Promise<string>;
    getCommentPage(postId: number, index: number, pageSize: number): Promise<CommentOrigin[]>;
    getCommentGetter(postId: number, pageSize?: number): CommentGetter;
    static readonly baseXmlHeader: IncomingHttpHeaders;
    protected getXmlHeader(n?: IncomingHttpHeaders): {
        [x: string]: string | string[] | undefined;
        accept?: string | undefined;
        "accept-language"?: string | undefined;
        "accept-patch"?: string | undefined;
        "accept-ranges"?: string | undefined;
        "access-control-allow-credentials"?: string | undefined;
        "access-control-allow-headers"?: string | undefined;
        "access-control-allow-methods"?: string | undefined;
        "access-control-allow-origin"?: string | undefined;
        "access-control-expose-headers"?: string | undefined;
        "access-control-max-age"?: string | undefined;
        "access-control-request-headers"?: string | undefined;
        "access-control-request-method"?: string | undefined;
        age?: string | undefined;
        allow?: string | undefined;
        "alt-svc"?: string | undefined;
        authorization?: string | undefined;
        "cache-control"?: string | undefined;
        connection?: string | undefined;
        "content-disposition"?: string | undefined;
        "content-encoding"?: string | undefined;
        "content-language"?: string | undefined;
        "content-length"?: string | undefined;
        "content-location"?: string | undefined;
        "content-range"?: string | undefined;
        "content-type"?: string | undefined;
        cookie?: string | undefined;
        date?: string | undefined;
        etag?: string | undefined;
        expect?: string | undefined;
        expires?: string | undefined;
        forwarded?: string | undefined;
        from?: string | undefined;
        host?: string | undefined;
        "if-match"?: string | undefined;
        "if-modified-since"?: string | undefined;
        "if-none-match"?: string | undefined;
        "if-unmodified-since"?: string | undefined;
        "last-modified"?: string | undefined;
        location?: string | undefined;
        origin?: string | undefined;
        pragma?: string | undefined;
        "proxy-authenticate"?: string | undefined;
        "proxy-authorization"?: string | undefined;
        "public-key-pins"?: string | undefined;
        range?: string | undefined;
        referer?: string | undefined;
        "retry-after"?: string | undefined;
        "sec-websocket-accept"?: string | undefined;
        "sec-websocket-extensions"?: string | undefined;
        "sec-websocket-key"?: string | undefined;
        "sec-websocket-protocol"?: string | undefined;
        "sec-websocket-version"?: string | undefined;
        "set-cookie"?: string[] | undefined;
        "strict-transport-security"?: string | undefined;
        tk?: string | undefined;
        trailer?: string | undefined;
        "transfer-encoding"?: string | undefined;
        upgrade?: string | undefined;
        "user-agent"?: string | undefined;
        vary?: string | undefined;
        via?: string | undefined;
        warning?: string | undefined;
        "www-authenticate"?: string | undefined;
    };
    protected xml(methodName: string, params: readonly any[]): string;
    editPost(postId: number, post: Post, publish?: boolean): Promise<boolean>;
}
