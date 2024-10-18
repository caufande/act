import type { Components, JSX } from "../types/components";

interface TaroLivePlayerCore extends Components.TaroLivePlayerCore, HTMLElement {}
export const TaroLivePlayerCore: {
  prototype: TaroLivePlayerCore;
  new (): TaroLivePlayerCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
