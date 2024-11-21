import type { Components, JSX } from "../types/components";

interface TaroListViewCore extends Components.TaroListViewCore, HTMLElement {}
export const TaroListViewCore: {
  prototype: TaroListViewCore;
  new (): TaroListViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
