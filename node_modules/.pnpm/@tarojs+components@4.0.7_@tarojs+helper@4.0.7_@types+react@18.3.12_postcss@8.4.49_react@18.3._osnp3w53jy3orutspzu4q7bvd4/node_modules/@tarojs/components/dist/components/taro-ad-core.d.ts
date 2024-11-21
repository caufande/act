import type { Components, JSX } from "../types/components";

interface TaroAdCore extends Components.TaroAdCore, HTMLElement {}
export const TaroAdCore: {
  prototype: TaroAdCore;
  new (): TaroAdCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
