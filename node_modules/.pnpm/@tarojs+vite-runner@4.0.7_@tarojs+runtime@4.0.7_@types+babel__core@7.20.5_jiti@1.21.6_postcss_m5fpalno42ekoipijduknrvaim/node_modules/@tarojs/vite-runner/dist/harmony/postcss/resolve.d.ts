import type { AcceptedPlugin, ProcessOptions } from 'postcss';
import type { ResolvedConfig } from 'vite';
interface PostCSSConfigResult {
    options: ProcessOptions;
    plugins: AcceptedPlugin[];
}
export declare function resolvePostcssConfig(config: ResolvedConfig, dialect?: string): Promise<PostCSSConfigResult | null | void>;
export {};
