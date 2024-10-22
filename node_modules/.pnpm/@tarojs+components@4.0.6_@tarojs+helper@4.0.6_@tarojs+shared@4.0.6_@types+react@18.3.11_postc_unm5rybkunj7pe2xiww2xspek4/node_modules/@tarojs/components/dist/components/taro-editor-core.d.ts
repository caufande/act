import type { Components, JSX } from "../types/components";

interface TaroEditorCore extends Components.TaroEditorCore, HTMLElement {}
export const TaroEditorCore: {
  prototype: TaroEditorCore;
  new (): TaroEditorCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
