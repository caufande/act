import type { Components, JSX } from "../types/components";

interface TaroLivePusherCore extends Components.TaroLivePusherCore, HTMLElement {}
export const TaroLivePusherCore: {
  prototype: TaroLivePusherCore;
  new (): TaroLivePusherCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
