import type { Components, JSX } from "../types/components";

interface TaroCommentListCore extends Components.TaroCommentListCore, HTMLElement {}
export const TaroCommentListCore: {
  prototype: TaroCommentListCore;
  new (): TaroCommentListCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
