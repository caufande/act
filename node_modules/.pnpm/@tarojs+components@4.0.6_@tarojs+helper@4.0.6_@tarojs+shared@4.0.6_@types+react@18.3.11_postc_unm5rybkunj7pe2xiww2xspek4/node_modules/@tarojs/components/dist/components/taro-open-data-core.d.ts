import type { Components, JSX } from "../types/components";

interface TaroOpenDataCore extends Components.TaroOpenDataCore, HTMLElement {}
export const TaroOpenDataCore: {
  prototype: TaroOpenDataCore;
  new (): TaroOpenDataCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
