import type { Components, JSX } from "../types/components";

interface TaroPickerViewCore extends Components.TaroPickerViewCore, HTMLElement {}
export const TaroPickerViewCore: {
  prototype: TaroPickerViewCore;
  new (): TaroPickerViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
