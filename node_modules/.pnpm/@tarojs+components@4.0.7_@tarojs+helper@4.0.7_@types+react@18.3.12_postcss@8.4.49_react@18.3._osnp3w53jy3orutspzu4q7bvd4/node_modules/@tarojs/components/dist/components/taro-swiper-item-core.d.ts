import type { Components, JSX } from "../types/components";

interface TaroSwiperItemCore extends Components.TaroSwiperItemCore, HTMLElement {}
export const TaroSwiperItemCore: {
  prototype: TaroSwiperItemCore;
  new (): TaroSwiperItemCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
