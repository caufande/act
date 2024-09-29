import type { Components, JSX } from "../types/components";

interface TaroGridBuilderCore extends Components.TaroGridBuilderCore, HTMLElement {}
export const TaroGridBuilderCore: {
  prototype: TaroGridBuilderCore;
  new (): TaroGridBuilderCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
