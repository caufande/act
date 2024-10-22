import type { Components, JSX } from "../types/components";

interface TaroTabItemCore extends Components.TaroTabItemCore, HTMLElement {}
export const TaroTabItemCore: {
  prototype: TaroTabItemCore;
  new (): TaroTabItemCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
