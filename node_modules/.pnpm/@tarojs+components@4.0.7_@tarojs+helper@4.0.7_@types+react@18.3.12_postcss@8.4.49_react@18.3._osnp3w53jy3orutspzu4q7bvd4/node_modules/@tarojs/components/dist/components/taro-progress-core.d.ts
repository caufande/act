import type { Components, JSX } from "../types/components";

interface TaroProgressCore extends Components.TaroProgressCore, HTMLElement {}
export const TaroProgressCore: {
  prototype: TaroProgressCore;
  new (): TaroProgressCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
