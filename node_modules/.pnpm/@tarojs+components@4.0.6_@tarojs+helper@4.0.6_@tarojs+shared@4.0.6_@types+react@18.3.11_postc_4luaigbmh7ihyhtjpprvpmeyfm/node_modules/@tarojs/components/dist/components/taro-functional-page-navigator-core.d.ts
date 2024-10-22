import type { Components, JSX } from "../types/components";

interface TaroFunctionalPageNavigatorCore extends Components.TaroFunctionalPageNavigatorCore, HTMLElement {}
export const TaroFunctionalPageNavigatorCore: {
  prototype: TaroFunctionalPageNavigatorCore;
  new (): TaroFunctionalPageNavigatorCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
