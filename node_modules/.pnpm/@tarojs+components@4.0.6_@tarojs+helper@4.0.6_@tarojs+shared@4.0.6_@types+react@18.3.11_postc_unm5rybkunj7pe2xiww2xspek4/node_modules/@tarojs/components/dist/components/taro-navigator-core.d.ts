import type { Components, JSX } from "../types/components";

interface TaroNavigatorCore extends Components.TaroNavigatorCore, HTMLElement {}
export const TaroNavigatorCore: {
  prototype: TaroNavigatorCore;
  new (): TaroNavigatorCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
