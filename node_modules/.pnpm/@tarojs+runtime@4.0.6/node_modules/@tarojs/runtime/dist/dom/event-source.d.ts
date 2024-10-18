import { TaroNode } from "./node.js";
interface IEventSource extends Map<string | undefined | null, TaroNode> {
    removeNode(child: TaroNode): void;
    removeNodeTree(child: TaroNode): void;
}
declare const eventSource: IEventSource;
export { eventSource };
