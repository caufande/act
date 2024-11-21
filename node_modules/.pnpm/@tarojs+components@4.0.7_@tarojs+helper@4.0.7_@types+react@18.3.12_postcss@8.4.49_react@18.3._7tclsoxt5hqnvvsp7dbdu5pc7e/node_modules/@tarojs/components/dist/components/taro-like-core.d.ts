import type { Components, JSX } from "../types/components";

interface TaroLikeCore extends Components.TaroLikeCore, HTMLElement {}
export const TaroLikeCore: {
  prototype: TaroLikeCore;
  new (): TaroLikeCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
