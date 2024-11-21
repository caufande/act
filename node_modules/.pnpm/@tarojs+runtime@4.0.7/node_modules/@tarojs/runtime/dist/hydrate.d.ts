import { TaroElement } from "./dom/element.js";
import { TaroText } from "./dom/text.js";
import { MiniData } from "./index-26658829.js";
/**
 * React also has a fancy function's name for this: `hydrate()`.
 * You may have been heard `hydrate` as a SSR-related function,
 * actually, `hydrate` basicly do the `render()` thing, but ignore some properties,
 * it's a vnode traverser and modifier: that's exactly what Taro's doing in here.
 */
declare function hydrate(node: TaroElement | TaroText): MiniData;
export { hydrate };
