import type { Components, JSX } from "../types/components";

interface TaroShareElementCore extends Components.TaroShareElementCore, HTMLElement {}
export const TaroShareElementCore: {
  prototype: TaroShareElementCore;
  new (): TaroShareElementCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
