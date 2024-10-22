import type { Components, JSX } from "../types/components";

interface TaroListBuilderCore extends Components.TaroListBuilderCore, HTMLElement {}
export const TaroListBuilderCore: {
  prototype: TaroListBuilderCore;
  new (): TaroListBuilderCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
