import type { Components, JSX } from "../types/components";

interface TaroRadioCore extends Components.TaroRadioCore, HTMLElement {}
export const TaroRadioCore: {
  prototype: TaroRadioCore;
  new (): TaroRadioCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
