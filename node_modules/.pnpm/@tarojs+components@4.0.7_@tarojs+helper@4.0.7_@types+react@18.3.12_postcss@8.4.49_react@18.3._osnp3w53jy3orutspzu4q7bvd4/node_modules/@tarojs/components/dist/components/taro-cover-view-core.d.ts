import type { Components, JSX } from "../types/components";

interface TaroCoverViewCore extends Components.TaroCoverViewCore, HTMLElement {}
export const TaroCoverViewCore: {
  prototype: TaroCoverViewCore;
  new (): TaroCoverViewCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
