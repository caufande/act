import type { Components, JSX } from "../types/components";

interface TaroNestedScrollBodyCore extends Components.TaroNestedScrollBodyCore, HTMLElement {}
export const TaroNestedScrollBodyCore: {
  prototype: TaroNestedScrollBodyCore;
  new (): TaroNestedScrollBodyCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
