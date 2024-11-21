import type { Components, JSX } from "../types/components";

interface TaroSliderCore extends Components.TaroSliderCore, HTMLElement {}
export const TaroSliderCore: {
  prototype: TaroSliderCore;
  new (): TaroSliderCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
