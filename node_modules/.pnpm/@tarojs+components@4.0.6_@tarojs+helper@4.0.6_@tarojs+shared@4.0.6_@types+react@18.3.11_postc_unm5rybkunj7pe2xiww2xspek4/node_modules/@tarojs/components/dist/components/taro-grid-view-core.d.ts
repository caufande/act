import type { Components, JSX } from "../types/components";

interface TaroGridViewCore extends Components.TaroGridViewCore, HTMLElement {}
export const TaroGridViewCore: {
  prototype: TaroGridViewCore;
  new (): TaroGridViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
