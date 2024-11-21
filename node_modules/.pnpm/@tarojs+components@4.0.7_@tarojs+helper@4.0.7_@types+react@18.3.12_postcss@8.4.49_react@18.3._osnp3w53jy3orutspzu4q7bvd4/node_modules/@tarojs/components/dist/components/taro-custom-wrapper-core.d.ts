import type { Components, JSX } from "../types/components";

interface TaroCustomWrapperCore extends Components.TaroCustomWrapperCore, HTMLElement {}
export const TaroCustomWrapperCore: {
  prototype: TaroCustomWrapperCore;
  new (): TaroCustomWrapperCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
