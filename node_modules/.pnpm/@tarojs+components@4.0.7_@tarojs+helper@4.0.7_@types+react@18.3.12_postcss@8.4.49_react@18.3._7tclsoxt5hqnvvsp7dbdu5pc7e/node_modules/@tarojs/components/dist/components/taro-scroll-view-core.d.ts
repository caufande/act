import type { Components, JSX } from "../types/components";

interface TaroScrollViewCore extends Components.TaroScrollViewCore, HTMLElement {}
export const TaroScrollViewCore: {
  prototype: TaroScrollViewCore;
  new (): TaroScrollViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
