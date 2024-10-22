import type { Components, JSX } from "../types/components";

interface TaroViewCore extends Components.TaroViewCore, HTMLElement {}
export const TaroViewCore: {
  prototype: TaroViewCore;
  new (): TaroViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
