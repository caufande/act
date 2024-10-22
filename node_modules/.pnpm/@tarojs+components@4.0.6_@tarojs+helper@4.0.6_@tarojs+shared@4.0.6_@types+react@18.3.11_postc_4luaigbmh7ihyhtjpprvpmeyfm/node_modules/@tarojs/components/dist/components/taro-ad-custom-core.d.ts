import type { Components, JSX } from "../types/components";

interface TaroAdCustomCore extends Components.TaroAdCustomCore, HTMLElement {}
export const TaroAdCustomCore: {
  prototype: TaroAdCustomCore;
  new (): TaroAdCustomCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
