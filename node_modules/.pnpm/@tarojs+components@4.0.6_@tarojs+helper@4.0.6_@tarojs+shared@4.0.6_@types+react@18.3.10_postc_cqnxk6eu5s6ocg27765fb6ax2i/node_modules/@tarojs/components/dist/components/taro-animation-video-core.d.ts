import type { Components, JSX } from "../types/components";

interface TaroAnimationVideoCore extends Components.TaroAnimationVideoCore, HTMLElement {}
export const TaroAnimationVideoCore: {
  prototype: TaroAnimationVideoCore;
  new (): TaroAnimationVideoCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
