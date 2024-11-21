import type { Components, JSX } from "../types/components";

interface TaroPageContainerCore extends Components.TaroPageContainerCore, HTMLElement {}
export const TaroPageContainerCore: {
  prototype: TaroPageContainerCore;
  new (): TaroPageContainerCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
