import type { Components, JSX } from "../types/components";

interface TaroAnimationViewCore extends Components.TaroAnimationViewCore, HTMLElement {}
export const TaroAnimationViewCore: {
  prototype: TaroAnimationViewCore;
  new (): TaroAnimationViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
