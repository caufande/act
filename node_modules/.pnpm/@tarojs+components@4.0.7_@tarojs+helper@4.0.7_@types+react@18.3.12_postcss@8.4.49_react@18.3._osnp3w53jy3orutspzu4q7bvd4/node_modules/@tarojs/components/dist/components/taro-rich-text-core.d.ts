import type { Components, JSX } from "../types/components";

interface TaroRichTextCore extends Components.TaroRichTextCore, HTMLElement {}
export const TaroRichTextCore: {
  prototype: TaroRichTextCore;
  new (): TaroRichTextCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
