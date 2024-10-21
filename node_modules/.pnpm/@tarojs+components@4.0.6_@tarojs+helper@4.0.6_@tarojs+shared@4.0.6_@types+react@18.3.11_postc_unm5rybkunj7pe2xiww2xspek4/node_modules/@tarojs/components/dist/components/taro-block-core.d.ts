import type { Components, JSX } from "../types/components";

interface TaroBlockCore extends Components.TaroBlockCore, HTMLElement {}
export const TaroBlockCore: {
  prototype: TaroBlockCore;
  new (): TaroBlockCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
