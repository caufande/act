import type { Components, JSX } from "../types/components";

interface TaroTabbar extends Components.TaroTabbar, HTMLElement {}
export const TaroTabbar: {
  prototype: TaroTabbar;
  new (): TaroTabbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
