import type { PluginOption } from 'vite';
interface IOption {
    comparisonId?: (id: string, watchFiles: Set<string>) => boolean;
    force?: boolean | ((id: string) => boolean);
    include?: (string | RegExp)[];
}
export default function ({ include, comparisonId, force }?: IOption): PluginOption;
export {};
