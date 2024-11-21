import type { Components, JSX } from "../types/components";

interface TaroIconCore extends Components.TaroIconCore, HTMLElement {}
export const TaroIconCore: {
  prototype: TaroIconCore;
  new (): TaroIconCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
