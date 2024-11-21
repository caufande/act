import type { Components, JSX } from "../types/components";

interface TaroPickerCore extends Components.TaroPickerCore, HTMLElement {}
export const TaroPickerCore: {
  prototype: TaroPickerCore;
  new (): TaroPickerCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
