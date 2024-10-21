import type { Components, JSX } from "../types/components";

interface TaroCanvasCore extends Components.TaroCanvasCore, HTMLElement {}
export const TaroCanvasCore: {
  prototype: TaroCanvasCore;
  new (): TaroCanvasCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
