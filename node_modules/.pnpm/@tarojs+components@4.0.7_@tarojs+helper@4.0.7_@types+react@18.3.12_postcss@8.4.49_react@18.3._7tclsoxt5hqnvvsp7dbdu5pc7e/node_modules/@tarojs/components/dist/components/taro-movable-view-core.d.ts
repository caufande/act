import type { Components, JSX } from "../types/components";

interface TaroMovableViewCore extends Components.TaroMovableViewCore, HTMLElement {}
export const TaroMovableViewCore: {
  prototype: TaroMovableViewCore;
  new (): TaroMovableViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
