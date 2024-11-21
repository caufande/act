import type { Components, JSX } from "../types/components";

interface TaroCameraCore extends Components.TaroCameraCore, HTMLElement {}
export const TaroCameraCore: {
  prototype: TaroCameraCore;
  new (): TaroCameraCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
