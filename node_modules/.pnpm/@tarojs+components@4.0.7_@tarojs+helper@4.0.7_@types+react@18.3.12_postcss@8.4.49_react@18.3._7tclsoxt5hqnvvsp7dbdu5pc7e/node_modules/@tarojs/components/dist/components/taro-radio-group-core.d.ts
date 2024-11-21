import type { Components, JSX } from "../types/components";

interface TaroRadioGroupCore extends Components.TaroRadioGroupCore, HTMLElement {}
export const TaroRadioGroupCore: {
  prototype: TaroRadioGroupCore;
  new (): TaroRadioGroupCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
