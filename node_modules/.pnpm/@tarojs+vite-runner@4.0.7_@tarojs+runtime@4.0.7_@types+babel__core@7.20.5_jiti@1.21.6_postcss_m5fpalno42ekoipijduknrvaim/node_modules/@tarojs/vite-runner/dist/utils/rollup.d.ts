import type { InternalModuleFormat } from 'rollup';
export declare const getResolveUrl: (path: string, URL?: string) => string;
export declare const getGenericImportMetaMechanism: (getUrl: (chunkId: string) => string) => (property: string | null, { chunkId }: {
    chunkId: string;
}) => string;
export declare const getUrlFromDocument: (chunkId: string, umd?: boolean) => string;
export declare const relativeUrlMechanisms: Record<InternalModuleFormat, (relativePath: string) => string>;
