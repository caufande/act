import type { InternalModuleFormat } from 'rollup';
import type { ResolvedConfig } from 'vite';
export declare function toOutputFilePathInJS(filename: string, type: 'asset' | 'public', hostId: string, hostType: 'js' | 'css' | 'html', config: ResolvedConfig, toRelative: (filename: string, hostType: string) => string | {
    runtime: string;
}): string | {
    runtime: string;
};
export declare function createToImportMetaURLBasedRelativeRuntime(format: InternalModuleFormat, isWorker: boolean): (filename: string, importer: string) => {
    runtime: string;
};
declare function toOutputFilePathWithoutRuntime(filename: string, type: 'asset' | 'public', hostId: string, hostType: 'js' | 'css' | 'html', config: ResolvedConfig, toRelative: (filename: string, hostId: string) => string): string;
export declare const toOutputFilePathInCss: typeof toOutputFilePathWithoutRuntime;
export {};
