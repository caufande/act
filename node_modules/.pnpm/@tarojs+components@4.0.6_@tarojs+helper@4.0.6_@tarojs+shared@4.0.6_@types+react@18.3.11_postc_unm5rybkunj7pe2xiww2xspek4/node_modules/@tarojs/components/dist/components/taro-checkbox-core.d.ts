import type { Components, JSX } from "../types/components";

interface TaroCheckboxCore extends Components.TaroCheckboxCore, HTMLElement {}
export const TaroCheckboxCore: {
  prototype: TaroCheckboxCore;
  new (): TaroCheckboxCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
