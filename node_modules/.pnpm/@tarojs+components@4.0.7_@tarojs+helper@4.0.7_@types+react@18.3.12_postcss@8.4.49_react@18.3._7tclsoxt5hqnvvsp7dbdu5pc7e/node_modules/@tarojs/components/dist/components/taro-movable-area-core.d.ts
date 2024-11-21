import type { Components, JSX } from "../types/components";

interface TaroMovableAreaCore extends Components.TaroMovableAreaCore, HTMLElement {}
export const TaroMovableAreaCore: {
  prototype: TaroMovableAreaCore;
  new (): TaroMovableAreaCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
