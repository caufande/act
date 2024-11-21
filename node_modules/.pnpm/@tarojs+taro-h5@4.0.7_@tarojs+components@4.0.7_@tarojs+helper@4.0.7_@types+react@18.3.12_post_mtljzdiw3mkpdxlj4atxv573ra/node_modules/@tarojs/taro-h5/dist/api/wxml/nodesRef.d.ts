import Taro from '@tarojs/api';
import { SelectorQuery } from "./selectorQuery.js";
declare class NodesRef implements Taro.NodesRef {
    _component?: TaroGeneral.IAnyObject;
    _selector: string;
    _selectorQuery: SelectorQuery;
    _single: boolean;
    constructor(selector: string, querySelectorQuery: SelectorQuery, single: boolean);
    context(cb: any): SelectorQuery;
    node(cb: any): SelectorQuery;
    boundingClientRect(cb: any): SelectorQuery;
    scrollOffset(cb: any): SelectorQuery;
    fields(fields: any, cb: any): SelectorQuery;
}
export { NodesRef };
