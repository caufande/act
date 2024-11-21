import { TaroElement } from "../dom/element.js";
import { Style } from "../dom/style.js";
type TGetComputedStyle = typeof window.getComputedStyle | ((el: TaroElement) => Style);
declare const taroGetComputedStyleProvider: TGetComputedStyle;
export { TGetComputedStyle, taroGetComputedStyleProvider };
