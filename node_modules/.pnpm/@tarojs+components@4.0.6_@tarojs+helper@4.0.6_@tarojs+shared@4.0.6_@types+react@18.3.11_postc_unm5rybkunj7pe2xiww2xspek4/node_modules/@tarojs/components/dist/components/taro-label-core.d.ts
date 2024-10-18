import type { Components, JSX } from "../types/components";

interface TaroLabelCore extends Components.TaroLabelCore, HTMLElement {}
export const TaroLabelCore: {
  prototype: TaroLabelCore;
  new (): TaroLabelCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
