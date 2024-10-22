import type { Components, JSX } from "../types/components";

interface TaroChannelVideoCore extends Components.TaroChannelVideoCore, HTMLElement {}
export const TaroChannelVideoCore: {
  prototype: TaroChannelVideoCore;
  new (): TaroChannelVideoCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
