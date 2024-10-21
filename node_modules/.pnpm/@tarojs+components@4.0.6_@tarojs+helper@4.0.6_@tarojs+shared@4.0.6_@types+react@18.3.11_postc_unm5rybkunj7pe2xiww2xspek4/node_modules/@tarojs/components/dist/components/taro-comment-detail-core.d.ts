import type { Components, JSX } from "../types/components";

interface TaroCommentDetailCore extends Components.TaroCommentDetailCore, HTMLElement {}
export const TaroCommentDetailCore: {
  prototype: TaroCommentDetailCore;
  new (): TaroCommentDetailCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
