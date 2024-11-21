import type { Components, JSX } from "../types/components";

interface TaroButtonCore extends Components.TaroButtonCore, HTMLElement {}
export const TaroButtonCore: {
  prototype: TaroButtonCore;
  new (): TaroButtonCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
