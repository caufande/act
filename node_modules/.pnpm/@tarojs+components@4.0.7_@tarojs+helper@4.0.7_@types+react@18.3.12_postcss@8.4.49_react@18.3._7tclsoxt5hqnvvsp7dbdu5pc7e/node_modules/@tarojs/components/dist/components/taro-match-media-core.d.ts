import type { Components, JSX } from "../types/components";

interface TaroMatchMediaCore extends Components.TaroMatchMediaCore, HTMLElement {}
export const TaroMatchMediaCore: {
  prototype: TaroMatchMediaCore;
  new (): TaroMatchMediaCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
