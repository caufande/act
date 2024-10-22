import type { Components, JSX } from "../types/components";

interface TaroPickerGroup extends Components.TaroPickerGroup, HTMLElement {}
export const TaroPickerGroup: {
  prototype: TaroPickerGroup;
  new (): TaroPickerGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
