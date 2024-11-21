import type { Components, JSX } from "../types/components";

interface TaroNavigationBarCore extends Components.TaroNavigationBarCore, HTMLElement {}
export const TaroNavigationBarCore: {
  prototype: TaroNavigationBarCore;
  new (): TaroNavigationBarCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
