import type { Components, JSX } from "../types/components";

interface TaroChannelLiveCore extends Components.TaroChannelLiveCore, HTMLElement {}
export const TaroChannelLiveCore: {
  prototype: TaroChannelLiveCore;
  new (): TaroChannelLiveCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
