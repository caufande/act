import type { Components, JSX } from "../types/components";

interface TaroNativeSlotCore extends Components.TaroNativeSlotCore, HTMLElement {}
export const TaroNativeSlotCore: {
  prototype: TaroNativeSlotCore;
  new (): TaroNativeSlotCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
