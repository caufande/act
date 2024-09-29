import type { Components, JSX } from "../types/components";

interface TaroTabsCore extends Components.TaroTabsCore, HTMLElement {}
export const TaroTabsCore: {
  prototype: TaroTabsCore;
  new (): TaroTabsCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
