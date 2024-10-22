import type { Components, JSX } from "../types/components";

interface TaroFormCore extends Components.TaroFormCore, HTMLElement {}
export const TaroFormCore: {
  prototype: TaroFormCore;
  new (): TaroFormCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
