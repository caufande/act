import type { Components, JSX } from "../types/components";

interface TaroPullToRefreshCore extends Components.TaroPullToRefreshCore, HTMLElement {}
export const TaroPullToRefreshCore: {
  prototype: TaroPullToRefreshCore;
  new (): TaroPullToRefreshCore;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
