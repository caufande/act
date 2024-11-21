import type { Components, JSX } from "../types/components";

interface TaroOpenContainerCore extends Components.TaroOpenContainerCore, HTMLElement {}
export const TaroOpenContainerCore: {
  prototype: TaroOpenContainerCore;
  new (): TaroOpenContainerCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
