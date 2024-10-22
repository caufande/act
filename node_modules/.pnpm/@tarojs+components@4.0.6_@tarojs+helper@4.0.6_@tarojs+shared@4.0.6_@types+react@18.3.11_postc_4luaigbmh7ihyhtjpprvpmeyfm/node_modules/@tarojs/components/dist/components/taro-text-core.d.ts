import type { Components, JSX } from "../types/components";

interface TaroTextCore extends Components.TaroTextCore, HTMLElement {}
export const TaroTextCore: {
  prototype: TaroTextCore;
  new (): TaroTextCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
