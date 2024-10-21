import type { Components, JSX } from "../types/components";

interface TaroSwiperCore extends Components.TaroSwiperCore, HTMLElement {}
export const TaroSwiperCore: {
  prototype: TaroSwiperCore;
  new (): TaroSwiperCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
