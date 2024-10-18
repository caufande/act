import type { Components, JSX } from "../types/components";

interface TaroLottieCore extends Components.TaroLottieCore, HTMLElement {}
export const TaroLottieCore: {
  prototype: TaroLottieCore;
  new (): TaroLottieCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
