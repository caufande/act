import type { Components, JSX } from "../types/components";

interface TaroWebViewCore extends Components.TaroWebViewCore, HTMLElement {}
export const TaroWebViewCore: {
  prototype: TaroWebViewCore;
  new (): TaroWebViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
