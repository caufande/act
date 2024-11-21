import type { Components, JSX } from "../types/components";

interface TaroCoverImageCore extends Components.TaroCoverImageCore, HTMLElement {}
export const TaroCoverImageCore: {
  prototype: TaroCoverImageCore;
  new (): TaroCoverImageCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
