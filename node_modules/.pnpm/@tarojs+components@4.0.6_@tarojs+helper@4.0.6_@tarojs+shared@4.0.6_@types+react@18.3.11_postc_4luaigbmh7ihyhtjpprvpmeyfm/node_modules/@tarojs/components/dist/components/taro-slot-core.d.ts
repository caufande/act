import type { Components, JSX } from "../types/components";

interface TaroSlotCore extends Components.TaroSlotCore, HTMLElement {}
export const TaroSlotCore: {
  prototype: TaroSlotCore;
  new (): TaroSlotCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
