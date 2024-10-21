import type { Components, JSX } from "../types/components";

interface TaroPageMetaCore extends Components.TaroPageMetaCore, HTMLElement {}
export const TaroPageMetaCore: {
  prototype: TaroPageMetaCore;
  new (): TaroPageMetaCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
