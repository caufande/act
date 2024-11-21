import type { Components, JSX } from "../types/components";

interface TaroLifestyleCore extends Components.TaroLifestyleCore, HTMLElement {}
export const TaroLifestyleCore: {
  prototype: TaroLifestyleCore;
  new (): TaroLifestyleCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
