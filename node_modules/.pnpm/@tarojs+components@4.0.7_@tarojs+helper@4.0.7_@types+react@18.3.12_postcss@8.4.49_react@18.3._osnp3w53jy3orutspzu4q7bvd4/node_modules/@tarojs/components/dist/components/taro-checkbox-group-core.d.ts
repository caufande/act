import type { Components, JSX } from "../types/components";

interface TaroCheckboxGroupCore extends Components.TaroCheckboxGroupCore, HTMLElement {}
export const TaroCheckboxGroupCore: {
  prototype: TaroCheckboxGroupCore;
  new (): TaroCheckboxGroupCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
