import type { Components, JSX } from "../types/components";

interface TaroInputCore extends Components.TaroInputCore, HTMLElement {}
export const TaroInputCore: {
  prototype: TaroInputCore;
  new (): TaroInputCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
