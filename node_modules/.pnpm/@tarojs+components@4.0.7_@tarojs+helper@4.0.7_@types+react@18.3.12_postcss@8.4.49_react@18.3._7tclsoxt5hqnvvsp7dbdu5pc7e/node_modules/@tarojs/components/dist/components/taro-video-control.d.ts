import type { Components, JSX } from "../types/components";

interface TaroVideoControl extends Components.TaroVideoControl, HTMLElement {}
export const TaroVideoControl: {
  prototype: TaroVideoControl;
  new (): TaroVideoControl;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
