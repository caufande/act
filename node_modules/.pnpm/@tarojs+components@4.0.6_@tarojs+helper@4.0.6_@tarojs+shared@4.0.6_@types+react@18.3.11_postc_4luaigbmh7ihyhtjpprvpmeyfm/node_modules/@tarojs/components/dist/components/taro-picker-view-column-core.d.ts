import type { Components, JSX } from "../types/components";

interface TaroPickerViewColumnCore extends Components.TaroPickerViewColumnCore, HTMLElement {}
export const TaroPickerViewColumnCore: {
  prototype: TaroPickerViewColumnCore;
  new (): TaroPickerViewColumnCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
