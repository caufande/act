import BaseParser from './base';
import type { TRollupResolveMethod } from '@tarojs/taro/types/compile/config/plugin';
import type { ViteHarmonyCompilerContext } from '@tarojs/taro/types/compile/viteCompilerContext';
export interface IChildComponent {
    namePrefix?: string;
    name: string;
    condition?: string;
    type?: string;
    args?: string[];
    extra?: string;
    fullArgument?: string;
}
export default class RenderParser extends BaseParser {
    protected template: Map<string, string>;
    protected context: ViteHarmonyCompilerContext;
    constructor(template: Map<string, string>, context: ViteHarmonyCompilerContext);
    componentList: IChildComponent[];
    generate(fileName: string, name?: string, resolve?: TRollupResolveMethod): string;
    generateComponentCreated({ namePrefix, name, condition, type, args, extra, fullArgument, }: IChildComponent): string;
    generateNativeComponentNamesInit(): string;
}
