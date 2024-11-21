import type { Components, JSX } from "../types/components";

interface TaroLoginCore extends Components.TaroLoginCore, HTMLElement {}
export const TaroLoginCore: {
  prototype: TaroLoginCore;
  new (): TaroLoginCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
