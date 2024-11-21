import { prettyPrintJson } from '../../utils';
import type { ViteHarmonyBuildConfig } from '@tarojs/taro/types/compile/viteCompilerContext';
export default class BaseParser {
    prettyPrintJson: typeof prettyPrintJson;
    transArr2Str(array: unknown[], prefixSpace?: number, connector?: string): any;
    getPxTransformConfig(buildConfig: ViteHarmonyBuildConfig): import("@tarojs/taro/types/compile").IPxTransformOption;
    getInitPxTransform(buildConfig: ViteHarmonyBuildConfig): any;
}
