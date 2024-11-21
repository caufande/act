import type { Components, JSX } from "../types/components";

interface TaroMapCore extends Components.TaroMapCore, HTMLElement {}
export const TaroMapCore: {
  prototype: TaroMapCore;
  new (): TaroMapCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
