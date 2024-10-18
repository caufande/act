import type { Components, JSX } from "../types/components";

interface TaroStickyHeaderCore extends Components.TaroStickyHeaderCore, HTMLElement {}
export const TaroStickyHeaderCore: {
  prototype: TaroStickyHeaderCore;
  new (): TaroStickyHeaderCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
