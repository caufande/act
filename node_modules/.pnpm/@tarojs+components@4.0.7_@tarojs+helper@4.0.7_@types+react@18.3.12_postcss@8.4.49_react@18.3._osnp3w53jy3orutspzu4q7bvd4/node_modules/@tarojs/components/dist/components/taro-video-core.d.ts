import type { Components, JSX } from "../types/components";

interface TaroVideoCore extends Components.TaroVideoCore, HTMLElement {}
export const TaroVideoCore: {
  prototype: TaroVideoCore;
  new (): TaroVideoCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
