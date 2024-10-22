import { TaroElement } from "./element.js";
type Filter = (element: TaroElement) => boolean;
declare function treeToArray(root: TaroElement, predict?: Filter): TaroElement[];
export { treeToArray };
