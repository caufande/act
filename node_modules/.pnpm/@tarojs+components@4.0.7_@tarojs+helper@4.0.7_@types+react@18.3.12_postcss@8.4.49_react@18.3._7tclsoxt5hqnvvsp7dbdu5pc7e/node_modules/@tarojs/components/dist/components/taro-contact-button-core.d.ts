import type { Components, JSX } from "../types/components";

interface TaroContactButtonCore extends Components.TaroContactButtonCore, HTMLElement {}
export const TaroContactButtonCore: {
  prototype: TaroContactButtonCore;
  new (): TaroContactButtonCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
