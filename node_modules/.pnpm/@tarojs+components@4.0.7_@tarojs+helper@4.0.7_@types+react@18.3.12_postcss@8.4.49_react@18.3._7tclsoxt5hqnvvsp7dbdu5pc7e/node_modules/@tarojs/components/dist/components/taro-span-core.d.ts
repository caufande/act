import type { Components, JSX } from "../types/components";

interface TaroSpanCore extends Components.TaroSpanCore, HTMLElement {}
export const TaroSpanCore: {
  prototype: TaroSpanCore;
  new (): TaroSpanCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
