import { Shortcuts } from "@tarojs/shared";
interface MiniElementData {
    [Shortcuts.Childnodes]?: MiniData[];
    [Shortcuts.NodeName]: string;
    [Shortcuts.Class]?: string;
    [Shortcuts.Style]?: string;
    uid?: string;
    sid: string;
    [key: string]: unknown;
}
interface MiniTextData {
    [Shortcuts.Text]: string;
    [Shortcuts.NodeName]: string;
}
type MiniData = MiniElementData | MiniTextData;
type HydratedData = () => MiniData | MiniData[];
type UpdatePayloadValue = string | boolean | HydratedData;
type DataTree = Record<string, UpdatePayloadValue | ReturnType<HydratedData>>;
interface UpdatePayload {
    path: string;
    value: UpdatePayloadValue;
}
export { UpdatePayloadValue, DataTree, UpdatePayload };
