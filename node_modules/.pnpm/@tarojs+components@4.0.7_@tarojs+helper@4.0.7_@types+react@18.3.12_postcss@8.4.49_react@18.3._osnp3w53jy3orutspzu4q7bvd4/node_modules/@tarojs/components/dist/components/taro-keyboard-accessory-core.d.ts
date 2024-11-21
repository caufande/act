import type { Components, JSX } from "../types/components";

interface TaroKeyboardAccessoryCore extends Components.TaroKeyboardAccessoryCore, HTMLElement {}
export const TaroKeyboardAccessoryCore: {
  prototype: TaroKeyboardAccessoryCore;
  new (): TaroKeyboardAccessoryCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
