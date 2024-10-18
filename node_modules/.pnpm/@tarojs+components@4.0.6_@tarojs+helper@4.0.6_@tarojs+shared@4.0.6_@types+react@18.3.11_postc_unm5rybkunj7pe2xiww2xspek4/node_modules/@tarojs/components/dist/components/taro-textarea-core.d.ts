import type { Components, JSX } from "../types/components";

interface TaroTextareaCore extends Components.TaroTextareaCore, HTMLElement {}
export const TaroTextareaCore: {
  prototype: TaroTextareaCore;
  new (): TaroTextareaCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
