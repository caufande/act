import type { Components, JSX } from "../types/components";

interface TaroFollowSwanCore extends Components.TaroFollowSwanCore, HTMLElement {}
export const TaroFollowSwanCore: {
  prototype: TaroFollowSwanCore;
  new (): TaroFollowSwanCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
