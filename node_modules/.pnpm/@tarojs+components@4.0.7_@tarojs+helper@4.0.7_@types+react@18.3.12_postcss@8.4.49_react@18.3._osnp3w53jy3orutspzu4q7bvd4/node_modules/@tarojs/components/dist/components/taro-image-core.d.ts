import type { Components, JSX } from "../types/components";

interface TaroImageCore extends Components.TaroImageCore, HTMLElement {}
export const TaroImageCore: {
  prototype: TaroImageCore;
  new (): TaroImageCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
