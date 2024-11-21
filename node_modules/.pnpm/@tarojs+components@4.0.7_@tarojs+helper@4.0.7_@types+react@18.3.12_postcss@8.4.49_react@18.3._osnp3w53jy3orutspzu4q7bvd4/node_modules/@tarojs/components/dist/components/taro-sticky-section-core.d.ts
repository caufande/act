import type { Components, JSX } from "../types/components";

interface TaroStickySectionCore extends Components.TaroStickySectionCore, HTMLElement {}
export const TaroStickySectionCore: {
  prototype: TaroStickySectionCore;
  new (): TaroStickySectionCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
