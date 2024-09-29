import Taro from '@tarojs/api';
import { NodesRef } from "./nodesRef.js";
interface ISelectorQueryQueue {
    component: TaroGeneral.IAnyObject;
    selector: string;
    single: boolean;
    fields: any;
}
type TSelectorQueryQueueCallback = (res: ISelectorQueryQueue) => void;
declare class SelectorQuery implements Taro.SelectorQuery {
    _defaultWebviewId: string | null;
    _webviewId: string | null;
    _queue: ISelectorQueryQueue[];
    _queueCb: (TSelectorQueryQueueCallback | null)[];
    _component?: TaroGeneral.IAnyObject;
    constructor();
    in(component: TaroGeneral.IAnyObject): this;
    select(selector: string): NodesRef;
    selectAll(selector: string): NodesRef;
    selectViewport(): NodesRef;
    exec(cb: any): Taro.NodesRef;
    _push(selector: string, component: any, single: any, fields: any, callback?: TSelectorQueryQueueCallback | null): void;
}
export { SelectorQuery };
